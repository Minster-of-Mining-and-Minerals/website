"use strict";

require("dotenv").config({ path: require("path").join(__dirname, "../.env"), override: true });
const { Client } = require("pg");

async function main() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  const attachments = await client.query(
    `SELECT COUNT(*)::int AS total, COUNT(file_path_thumb)::int AS with_variants FROM attachments`,
  );
  const meta = await client.query(`SELECT COUNT(*)::int AS count FROM "SequelizeMeta"`);
  const users = await client.query(`SELECT COUNT(*)::int AS count FROM users`);
  const tenders = await client.query(`SELECT COUNT(*)::int AS count FROM tenders`);

  console.log(JSON.stringify({
    attachments: attachments.rows[0],
    sequelizeMeta: meta.rows[0].count,
    users: users.rows[0].count,
    tenders: tenders.rows[0].count,
  }, null, 2));

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
