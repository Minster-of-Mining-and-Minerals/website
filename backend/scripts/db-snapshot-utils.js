"use strict";

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
require("dotenv").config({ path: path.join(__dirname, "../.env"), override: true });

const BACKEND_ROOT = path.join(__dirname, "..");
const SNAPSHOT_FILE = process.env.DB_SNAPSHOT_FILE
  ? path.resolve(process.env.DB_SNAPSHOT_FILE)
  : path.join(BACKEND_ROOT, "db-snapshot.sql");
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
    const versions = ["18", "17", "16", "15", "14", "13"];
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

function isDockerAvailable() {
  try {
    execSync("docker info", { stdio: ["pipe", "pipe", "ignore"] });
    return true;
  } catch {
    return false;
  }
}

function dockerHostForClient(host) {
  if (host === "localhost" || host === "127.0.0.1") {
    return process.platform === "linux" ? "172.17.0.1" : "host.docker.internal";
  }
  return host;
}

function resolvePsqlCommand(config) {
  if (isDockerDbRunning()) {
    return {
      mode: "docker-exec",
      command: "docker",
      args: [
        "exec",
        "-i",
        "-e",
        `PGPASSWORD=${config.password}`,
        DOCKER_CONTAINER,
        "psql",
        ...psqlArgs(config),
      ],
    };
  }

  const psql = findPgBinary("psql");
  if (psql) {
    return {
      mode: "local",
      command: psql,
      args: ["-h", config.host, "-p", config.port, ...psqlArgs(config)],
      env: { PGPASSWORD: config.password },
    };
  }

  if (isDockerAvailable()) {
    return {
      mode: "docker-run",
      command: "docker",
      args: [
        "run",
        "--rm",
        "-i",
        "-e",
        `PGPASSWORD=${config.password}`,
        "postgres:16-alpine",
        "psql",
        "-h",
        dockerHostForClient(config.host),
        "-p",
        config.port,
        "-U",
        config.user,
        "-d",
        config.database,
        "-v",
        "ON_ERROR_STOP=1",
      ],
    };
  }

  return null;
}

function resolvePgDumpCommand(config) {
  if (isDockerDbRunning()) {
    return {
      mode: "docker-exec",
      command: "docker",
      args: [
        "exec",
        "-e",
        `PGPASSWORD=${config.password}`,
        DOCKER_CONTAINER,
        "pg_dump",
        ...pgDumpArgs(config),
      ],
    };
  }

  const pgDump = findPgBinary("pg_dump");
  if (pgDump) {
    return {
      mode: "local",
      command: pgDump,
      args: ["-h", config.host, "-p", config.port, ...pgDumpArgs(config)],
      env: { PGPASSWORD: config.password },
    };
  }

  if (isDockerAvailable()) {
    return {
      mode: "docker-run",
      command: "docker",
      args: [
        "run",
        "--rm",
        "-e",
        `PGPASSWORD=${config.password}`,
        "postgres:16-alpine",
        "pg_dump",
        "-h",
        dockerHostForClient(config.host),
        "-p",
        config.port,
        ...pgDumpArgs(config),
      ],
    };
  }

  return null;
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
  isDockerAvailable,
  pgDumpArgs,
  psqlArgs,
  findPgBinary,
  resolvePsqlCommand,
  resolvePgDumpCommand,
};
