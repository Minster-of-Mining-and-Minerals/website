"use strict";

const { Client } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const TEST_DB = "mom_website_migration_test";

async function main() {
  const admin = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  });

  await admin.connect();
  await admin.query(`DROP DATABASE IF EXISTS ${TEST_DB};`);
  await admin.query(`CREATE DATABASE ${TEST_DB};`);
  await admin.end();
  console.log(`Created database: ${TEST_DB}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
