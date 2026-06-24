"use strict";

/**
 * Upgrade server v1 snapshot + uploads to v2 schema locally.
 * Usage: npm run db:upgrade-from-server
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { Client } = require("pg");

require("dotenv").config({ path: path.join(__dirname, "../.env"), override: true });

const BACKEND_ROOT = path.join(__dirname, "..");
const SNAPSHOT_V1 = path.join(BACKEND_ROOT, "db-snapshot.sql");
const SNAPSHOT_V1_BACKUP = path.join(BACKEND_ROOT, "db-snapshot-v1-original.sql");
const UPLOADS_ARCHIVE = path.join(BACKEND_ROOT, "server-uploads.tar.gz");
const UPLOADS_DIR = path.join(BACKEND_ROOT, "uploads");

function run(command) {
  console.log(`\n> ${command}`);
  execSync(command, { cwd: BACKEND_ROOT, stdio: "inherit", env: process.env });
}

async function recreateDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: "postgres",
  });

  const dbName = process.env.DB_NAME || "mom_website";
  await client.connect();
  await client.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()`, [dbName]);
  await client.query(`DROP DATABASE IF EXISTS "${dbName}"`);
  await client.query(`CREATE DATABASE "${dbName}"`);
  await client.end();
  console.log(`Recreated database: ${dbName}`);
}

async function verify() {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "mom_website",
  });

  await client.connect();
  const attachments = await client.query(
    `SELECT COUNT(*)::int AS total, COUNT(file_path_thumb)::int AS with_variants FROM attachments`,
  );
  const meta = await client.query(`SELECT COUNT(*)::int AS count FROM "SequelizeMeta"`);
  const tenders = await client.query(`SELECT COUNT(*)::int AS count FROM tenders`);
  await client.end();

  console.log("\n=== Verification ===");
  console.log(attachments.rows[0]);
  console.log(`SequelizeMeta rows: ${meta.rows[0].count}`);
  console.log(`tenders table exists, rows: ${tenders.rows[0].count}`);
}

async function main() {
  if (!fs.existsSync(SNAPSHOT_V1)) {
    throw new Error(`Missing ${SNAPSHOT_V1}`);
  }

  if (!fs.existsSync(UPLOADS_ARCHIVE)) {
    throw new Error(`Missing ${UPLOADS_ARCHIVE}`);
  }

  if (!fs.existsSync(SNAPSHOT_V1_BACKUP)) {
    fs.copyFileSync(SNAPSHOT_V1, SNAPSHOT_V1_BACKUP);
    console.log(`Backed up original snapshot to ${path.basename(SNAPSHOT_V1_BACKUP)}`);
  }

  console.log("Extracting server uploads...");
  run(`tar -xzf "${UPLOADS_ARCHIVE}"`);

  if (!fs.existsSync(path.join(UPLOADS_DIR, "attachments"))) {
    throw new Error("uploads/attachments not found after extracting server-uploads.tar.gz");
  }

  await recreateDatabase();

  console.log("\nImporting server snapshot...");
  process.env.DB_SNAPSHOT_FILE = SNAPSHOT_V1_BACKUP;
  run("node scripts/db-import.js");
  delete process.env.DB_SNAPSHOT_FILE;

  console.log("\nApplying v2 schema migrations...");
  run("npx sequelize-cli db:migrate");

  console.log("\nSeeding production permissions...");
  run("npm run seed:production");

  console.log("\nReprocessing attachment files...");
  run("node scripts/reprocess-attachments.js");

  console.log("\nExporting upgraded snapshot...");
  run("node scripts/db-export.js");

  const finalSnapshot = path.join(BACKEND_ROOT, "db-snapshot.sql");
  const finalCopy = path.join(BACKEND_ROOT, "db-snapshot-v2-final.sql");
  fs.copyFileSync(finalSnapshot, finalCopy);
  console.log(`Saved upgraded snapshot as db-snapshot-v2-final.sql`);

  await verify();
  console.log("\nDone. Commit db-snapshot.sql, push code, scp deploy-uploads.tar.gz to server.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
