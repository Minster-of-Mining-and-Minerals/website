"use strict";

/**
 * Idempotent helpers for Sequelize migrations (PostgreSQL).
 */

async function tableExists(queryInterface, tableName) {
  const tables = await queryInterface.showAllTables();
  const normalized = tableName.toLowerCase();
  return tables.some((t) => String(t).toLowerCase() === normalized);
}

async function createTableIfNotExists(queryInterface, tableName, attributes, options) {
  if (!(await tableExists(queryInterface, tableName))) {
    await queryInterface.createTable(tableName, attributes, options);
  }
}

async function dropTableIfExists(queryInterface, tableName, options) {
  if (await tableExists(queryInterface, tableName)) {
    await queryInterface.dropTable(tableName, options);
  }
}

async function columnExists(queryInterface, tableName, columnName) {
  const description = await queryInterface.describeTable(tableName);
  return Object.prototype.hasOwnProperty.call(description, columnName);
}

async function addColumnIfNotExists(queryInterface, tableName, columnName, attributes, options) {
  if (!(await tableExists(queryInterface, tableName))) return;
  if (!(await columnExists(queryInterface, tableName, columnName))) {
    await queryInterface.addColumn(tableName, columnName, attributes, options);
  }
}

async function removeColumnIfExists(queryInterface, tableName, columnName, options) {
  if (!(await tableExists(queryInterface, tableName))) return;
  if (await columnExists(queryInterface, tableName, columnName)) {
    await queryInterface.removeColumn(tableName, columnName, options);
  }
}

async function constraintExists(queryInterface, tableName, constraintName) {
  const [rows] = await queryInterface.sequelize.query(
    `
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    WHERE t.relname = :tableName
      AND c.conname = :constraintName
    LIMIT 1;
    `,
    { replacements: { tableName, constraintName } },
  );
  return rows.length > 0;
}

async function addConstraintIfNotExists(queryInterface, tableName, options) {
  if (!(await tableExists(queryInterface, tableName))) return;
  if (!(await constraintExists(queryInterface, tableName, options.name))) {
    await queryInterface.addConstraint(tableName, options);
  }
}

async function dropConstraintIfExists(queryInterface, tableName, constraintName) {
  if (!(await tableExists(queryInterface, tableName))) return;
  if (await constraintExists(queryInterface, tableName, constraintName)) {
    await queryInterface.removeConstraint(tableName, constraintName);
  }
}

async function indexExists(queryInterface, tableName, indexName) {
  const [rows] = await queryInterface.sequelize.query(
    `
    SELECT 1
    FROM pg_indexes
    WHERE tablename = :tableName
      AND indexname = :indexName
    LIMIT 1;
    `,
    { replacements: { tableName, indexName } },
  );
  return rows.length > 0;
}

async function addIndexIfNotExists(queryInterface, tableName, fields, options = {}) {
  const indexName = options.name || `idx_${tableName}_${[].concat(fields).join("_")}`;
  if (!(await tableExists(queryInterface, tableName))) return;
  if (!(await indexExists(queryInterface, tableName, indexName))) {
    await queryInterface.addIndex(tableName, fields, { ...options, name: indexName });
  }
}

async function dropIndexIfExists(queryInterface, tableName, indexName) {
  if (!(await tableExists(queryInterface, tableName))) return;
  if (await indexExists(queryInterface, tableName, indexName)) {
    await queryInterface.removeIndex(tableName, indexName);
  }
}

async function dropEnumIfExists(queryInterface, enumName) {
  await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "${enumName}";`);
}

module.exports = {
  tableExists,
  createTableIfNotExists,
  dropTableIfExists,
  columnExists,
  addColumnIfNotExists,
  removeColumnIfExists,
  constraintExists,
  addConstraintIfNotExists,
  dropConstraintIfExists,
  indexExists,
  addIndexIfNotExists,
  dropIndexIfExists,
  dropEnumIfExists,
};
