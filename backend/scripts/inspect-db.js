"use strict";
require("dotenv").config({ override: true });
const { Client } = require("pg");

(async () => {
  const c = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await c.connect();
  const pk = await c.query(
    `SELECT conname, contype, pg_get_constraintdef(oid) AS def
     FROM pg_constraint WHERE conrelid = 'attachments'::regclass`,
  );
  console.log("attachments constraints:", pk.rows);
  const cols = await c.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_name = 'sliders' ORDER BY ordinal_position`,
  );
  console.log("sliders cols:", cols.rows.map((r) => r.column_name));
  const attCols = await c.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_name = 'attachments' ORDER BY ordinal_position`,
  );
  console.log("attachments cols:", attCols.rows.map((r) => r.column_name));
  const meta = await c.query(
    `SELECT name FROM "SequelizeMeta" WHERE name LIKE '202606%' ORDER BY name`,
  );
  console.log("v2 migrations:", meta.rows);
  const tenders = await c.query(`SELECT to_regclass('public.tenders') AS t`);
  console.log("tenders:", tenders.rows[0]);
  await c.end();
})().catch(console.error);
