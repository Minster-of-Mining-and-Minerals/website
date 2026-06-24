"use strict";

/**
 * Import pg_dump SQL using node pg (no psql required).
 */
const fs = require("fs");
const { Client } = require("pg");
const { from: copyFrom } = require("pg-copy-streams");
const { getDbConfig } = require("./db-snapshot-utils");

function pipeline(stream, data) {
  return new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.write(data);
    stream.end();
  });
}

async function runCopy(client, copyStatement, dataLines) {
  const stream = client.query(copyFrom(copyStatement));
  const payload = dataLines.length ? `${dataLines.join("\n")}\n` : "";
  try {
    await pipeline(stream, payload);
  } catch (error) {
    error.message = `${error.message}\nWhile running: ${copyStatement}`;
    throw error;
  }
}

async function importSqlFile(filePath) {
  const config = getDbConfig();
  const client = new Client({
    host: config.host,
    port: Number(config.port),
    user: config.user,
    password: config.password,
    database: config.database,
  });

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  await client.connect();

  let sqlBuffer = "";

  const flushSql = async () => {
    const sql = sqlBuffer.trim();
    sqlBuffer = "";
    if (!sql) return;
    await client.query(sql);
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (line.startsWith("\\restrict") || line.startsWith("\\unrestrict")) {
      continue;
    }

    if (line.startsWith("COPY ") && line.endsWith(" FROM stdin;")) {
      await flushSql();
      const dataLines = [];
      i += 1;
      while (i < lines.length && lines[i] !== "\\.") {
        dataLines.push(lines[i]);
        i += 1;
      }
      await runCopy(client, line, dataLines);
      continue;
    }

    if (line === "\\.") {
      continue;
    }

    if (line.startsWith("--") || line.trim() === "") {
      continue;
    }

    sqlBuffer += `${line}\n`;
    if (line.trimEnd().endsWith(";")) {
      await flushSql();
    }
  }

  await flushSql();
  await client.end();
}

module.exports = { importSqlFile };
