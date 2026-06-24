"use strict";

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const BACKEND_ROOT = path.join(__dirname, "..");
const SNAPSHOT_FILE = path.join(BACKEND_ROOT, "db-snapshot.sql");
const DOCKER_CONTAINER = process.env.DB_DOCKER_CONTAINER || "mom_postgres";

function findPgBinary(name) {
  const binary = process.platform === "win32" ? `${name}.exe` : name;

  try {
    execSync(process.platform === "win32" ? `where ${name}` : `which ${name}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return name;
  } catch {
    // continue
  }

  if (process.platform === "win32") {
    const programFiles = process.env["ProgramFiles"] || "C:\\Program Files";
    const versions = ["17", "16", "15", "14", "13"];
    for (const version of versions) {
      const candidate = path.join(programFiles, "PostgreSQL", version, "bin", binary);
      if (fs.existsSync(candidate)) return candidate;
    }
  }

  return null;
}

function getDbConfig() {
  return {
    host: process.env.DB_HOST || "localhost",
    port: String(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mom_website",
  };
}

function isDockerDbRunning() {
  try {
    const output = execSync(
      `docker ps --filter name=^/${DOCKER_CONTAINER}$ --filter status=running --format "{{.Names}}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] },
    );
    return output.trim() === DOCKER_CONTAINER;
  } catch {
    return false;
  }
}

function pgDumpArgs(config) {
  return [
    "-U",
    config.user,
    "-d",
    config.database,
    "--clean",
    "--if-exists",
    "--no-owner",
    "--no-acl",
  ];
}

function psqlArgs(config) {
  return ["-U", config.user, "-d", config.database, "-v", "ON_ERROR_STOP=1"];
}

module.exports = {
  BACKEND_ROOT,
  SNAPSHOT_FILE,
  DOCKER_CONTAINER,
  getDbConfig,
  isDockerDbRunning,
  pgDumpArgs,
  psqlArgs,
  findPgBinary,
};
