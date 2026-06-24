"use strict";

/**
 * Export PostgreSQL database to backend/db-snapshot.sql before running migrations.
 * Usage: npm run db:export
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const {
  BACKEND_ROOT,
  SNAPSHOT_FILE,
  getDbConfig,
  resolvePgDumpCommand,
} = require("./db-snapshot-utils");

async function runExport() {
  const config = getDbConfig();
  const invoker = resolvePgDumpCommand(config);

  if (!invoker) {
    console.error(
      "pg_dump not available. Start Docker, install PostgreSQL client tools, or run mom_postgres container.",
    );
    process.exit(1);
  }

  if (!invoker.mode.startsWith("docker") && config.host === "db") {
    console.error(
      "DB_HOST is 'db' but Docker container is not running. Start postgres with docker compose up -d db",
    );
    process.exit(1);
  }

  const tempFile = `${SNAPSHOT_FILE}.tmp`;
  const writeStream = fs.createWriteStream(tempFile);

  console.log(`Exporting database "${config.database}"...`);
  console.log(`Via ${invoker.mode}`);

  const child = spawn(invoker.command, invoker.args, {
    env: { ...process.env, ...(invoker.env || {}) },
    stdio: ["ignore", "pipe", "inherit"],
  });

  child.stdout.pipe(writeStream);

  const exitCode = await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
    writeStream.on("error", reject);
  });

  await new Promise((resolve, reject) => {
    writeStream.end(() => resolve());
    writeStream.on("error", reject);
  });

  if (exitCode !== 0) {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    console.error("Export failed.");
    process.exit(exitCode || 1);
  }

  if (fs.existsSync(SNAPSHOT_FILE)) {
    const backupDir = path.join(BACKEND_ROOT, "tmp");
    fs.mkdirSync(backupDir, { recursive: true });
    const backup = path.join(backupDir, `db-snapshot-${Date.now()}.bak`);
    fs.copyFileSync(SNAPSHOT_FILE, backup);
    console.log(`Previous snapshot backed up to tmp/${path.basename(backup)}`);
  }

  fs.renameSync(tempFile, SNAPSHOT_FILE);

  const sizeMb = (fs.statSync(SNAPSHOT_FILE).size / (1024 * 1024)).toFixed(2);
  console.log(`Snapshot saved: ${SNAPSHOT_FILE} (${sizeMb} MB)`);
}

runExport().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
