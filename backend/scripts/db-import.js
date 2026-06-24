"use strict";

/**
 * Import PostgreSQL database from backend/db-snapshot.sql after migrations.
 * Usage: npm run db:import
 */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const {
  SNAPSHOT_FILE,
  DOCKER_CONTAINER,
  getDbConfig,
  isDockerDbRunning,
  psqlArgs,
  findPgBinary,
} = require("./db-snapshot-utils");

async function runImport() {
  const config = getDbConfig();
  const useDocker = isDockerDbRunning();

  if (!fs.existsSync(SNAPSHOT_FILE)) {
    console.error(`Snapshot not found: ${SNAPSHOT_FILE}`);
    console.error("Run npm run db:export before migrations.");
    process.exit(1);
  }

  if (!useDocker && config.host === "db") {
    console.error(
      "DB_HOST is 'db' but Docker container is not running. Start postgres with docker compose up -d db",
    );
    process.exit(1);
  }

  const sizeMb = (fs.statSync(SNAPSHOT_FILE).size / (1024 * 1024)).toFixed(2);
  console.log(`Importing snapshot (${sizeMb} MB) into "${config.database}"...`);
  console.log(useDocker ? `Via Docker: ${DOCKER_CONTAINER}` : `Via host: ${config.host}:${config.port}`);
  console.warn("This will replace the current database contents.");

  const readStream = fs.createReadStream(SNAPSHOT_FILE);
  const sqlArgs = psqlArgs(config);
  const psql = findPgBinary("psql");

  if (!useDocker && !psql) {
    console.error(
      "psql not found. Install PostgreSQL client tools, add them to PATH, or start Docker (mom_postgres).",
    );
    process.exit(1);
  }

  const child = useDocker
    ? spawn(
        "docker",
        [
          "exec",
          "-i",
          "-e",
          `PGPASSWORD=${config.password}`,
          DOCKER_CONTAINER,
          "psql",
          ...sqlArgs,
        ],
        { stdio: ["pipe", "inherit", "inherit"] },
      )
    : spawn(
        psql,
        ["-h", config.host, "-p", config.port, ...sqlArgs],
        {
          env: { ...process.env, PGPASSWORD: config.password },
          stdio: ["pipe", "inherit", "inherit"],
        },
      );

  readStream.pipe(child.stdin);

  const exitCode = await new Promise((resolve, reject) => {
    child.on("error", (err) => {
      if (err.code === "ENOENT") {
        reject(
          new Error(
            useDocker
              ? "docker command not found. Install Docker or use local PostgreSQL client tools."
              : "psql not found. Install PostgreSQL client tools or start the Docker database container.",
          ),
        );
        return;
      }
      reject(err);
    });
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
