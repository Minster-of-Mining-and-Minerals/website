"use strict";

/**
 * Export PostgreSQL database to backend/db-snapshot.sql before running migrations.
 * Usage: npm run db:export
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const {
  SNAPSHOT_FILE,
  DOCKER_CONTAINER,
  getDbConfig,
  isDockerDbRunning,
  pgDumpArgs,
  findPgBinary,
} = require("./db-snapshot-utils");

async function runExport() {
  const config = getDbConfig();
  const useDocker = isDockerDbRunning();

  if (!useDocker && config.host === "db") {
    console.error(
      "DB_HOST is 'db' but Docker container is not running. Start postgres with docker compose up -d db",
    );
    process.exit(1);
  }

  const tempFile = `${SNAPSHOT_FILE}.tmp`;
  const writeStream = fs.createWriteStream(tempFile);

  console.log(`Exporting database "${config.database}"...`);
  console.log(useDocker ? `Via Docker: ${DOCKER_CONTAINER}` : `Via host: ${config.host}:${config.port}`);

  const dumpArgs = pgDumpArgs(config);
  const pgDump = findPgBinary("pg_dump");

  if (!useDocker && !pgDump) {
    console.error(
      "pg_dump not found. Install PostgreSQL client tools, add them to PATH, or start Docker (mom_postgres).",
    );
    process.exit(1);
  }

  const child = useDocker
    ? spawn(
        "docker",
        [
          "exec",
          "-e",
          `PGPASSWORD=${config.password}`,
          DOCKER_CONTAINER,
          "pg_dump",
          ...dumpArgs,
        ],
        { stdio: ["ignore", "pipe", "inherit"] },
      )
    : spawn(
        pgDump,
        ["-h", config.host, "-p", config.port, ...dumpArgs],
        {
          env: { ...process.env, PGPASSWORD: config.password },
          stdio: ["ignore", "pipe", "inherit"],
        },
      );

  child.stdout.pipe(writeStream);

  const exitCode = await new Promise((resolve, reject) => {
    child.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(
          new Error(
            useDocker
              ? "docker command not found. Install Docker or use local PostgreSQL client tools."
              : "pg_dump not found. Install PostgreSQL client tools or start the Docker database container.",
          ),
        );
        return;
      }
      reject(err);
    });
    child.on("close", resolve);
    writeStream.on("error", reject);
  });

  await new Promise((resolve, reject) => {
    writeStream.end(() => resolve());
    writeStream.on("error", reject);
  });

  if (exitCode !== 0) {
    fs.unlinkSync(tempFile);
    console.error("Export failed.");
    process.exit(exitCode || 1);
  }

  if (fs.existsSync(SNAPSHOT_FILE)) {
    const backup = `${SNAPSHOT_FILE}.${Date.now()}.bak`;
    fs.renameSync(SNAPSHOT_FILE, backup);
    console.log(`Previous snapshot backed up to ${path.basename(backup)}`);
  }

  fs.renameSync(tempFile, SNAPSHOT_FILE);

  const sizeMb = (fs.statSync(SNAPSHOT_FILE).size / (1024 * 1024)).toFixed(2);
  console.log(`Snapshot saved: ${SNAPSHOT_FILE} (${sizeMb} MB)`);
  console.log("Run migrations, then restore with: npm run db:import");
}

runExport().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
