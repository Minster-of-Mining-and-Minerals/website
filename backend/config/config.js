const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env"), override: true });

const pool = {
  max: 10,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

const baseConfig = {
  dialect: process.env.DB_DIALECT || "postgres",
  pool,
  timezone: "+00:00",
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    ...baseConfig,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    ...baseConfig,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    ...baseConfig,
  },
};
