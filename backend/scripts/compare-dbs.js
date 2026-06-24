"use strict";
require("dotenv").config({ path: require("path").join(__dirname, "../.env"), override: true });
const { Client } = require("pg");

async function checkDb(name) {
  const c = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: name,
  });
  try {
    await c.connect();
    const sliders = await c.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='sliders' AND column_name='button_name'`,
    );
    const users = await c.query(`SELECT COUNT(*)::int AS c FROM users`);
    console.log(name, { button_name: sliders.rows.length > 0, users: users.rows[0].c });
    await c.end();
  } catch (e) {
    console.log(name, "ERROR", e.message);
  }
}

(async () => {
  console.log("DB_NAME from env:", process.env.DB_NAME);
  await checkDb("mom_website");
  await checkDb("mom_website_migration_test");
})();
