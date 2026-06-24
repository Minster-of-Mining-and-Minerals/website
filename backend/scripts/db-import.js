"use strict";

/**
 * Import PostgreSQL database from backend/db-snapshot.sql after migrations.
 * Usage: npm run db:import
 */
const fs = require("fs");
const { spawn } = require("child_process");
const {
  SNAPSHOT_FILE,
  getDbConfig,
  resolvePsqlCommand,
} = require("./db-snapshot-utils");
const { importSqlFile } = require("./db-import-pg");

async function runImport() {
  const config = getDbConfig();
  const invoker = resolvePsqlCommand(config);

  if (!fs.existsSync(SNAPSHOT_FILE)) {
    console.error(`Snapshot not found: ${SNAPSHOT_FILE}`);
    console.error("Run npm run db:export before migrations.");
    process.exit(1);
  }

  if (!invoker) {
    const sizeMb = (fs.statSync(SNAPSHOT_FILE).size / (1024 * 1024)).toFixed(2);
    console.log(`Importing snapshot (${sizeMb} MB) into "${config.database}"...`);
    console.log("Via node-pg (no psql found)");
    console.warn("This will replace the current database contents.");
    await importSqlFile(SNAPSHOT_FILE);
    console.log("Database restored successfully from db-snapshot.sql");
    return;
  }

  if (!invoker.mode.startsWith("docker") && config.host === "db") {
    console.error(
      "DB_HOST is 'db' but Docker container is not running. Start postgres with docker compose up -d db",
    );
    process.exit(1);
  }

  const sizeMb = (fs.statSync(SNAPSHOT_FILE).size / (1024 * 1024)).toFixed(2);
  console.log(`Importing snapshot (${sizeMb} MB) into "${config.database}"...`);
  console.log(`Via ${invoker.mode}`);
  console.warn("This will replace the current database contents.");

  const readStream = fs.createReadStream(SNAPSHOT_FILE);
  const child = spawn(invoker.command, invoker.args, {
    env: { ...process.env, ...(invoker.env || {}) },
    stdio: ["pipe", "inherit", "inherit"],
  });

  readStream.pipe(child.stdin);

  const exitCode = await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
    readStream.on("error", reject);
  });

  if (exitCode !== 0) {
    console.error("Import failed.");
    process.exit(exitCode || 1);
  }

  console.log("Database restored successfully from db-snapshot.sql");
}

runImport().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
