"use strict";


const {
  createTableIfNotExists,
  dropTableIfExists,
  addColumnIfNotExists,
  removeColumnIfExists,
  addConstraintIfNotExists,
  dropConstraintIfExists,
  dropEnumIfExists,
} = require("./lib/migration-utils");
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, create the ENUM type for sector
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_resource_sector" AS ENUM ('mining', 'geology', 'petroleum', 'other');
    `);

    await createTableIfNotExists(queryInterface, "resource", {
      resource_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      sector: {
        type: Sequelize.ENUM("mining", "geology", "petroleum", "other"),
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex("resource", ["sector"]);
    await queryInterface.addIndex("resource", ["created_at"]);
    await queryInterface.addIndex("resource", ["deleted_at"]);
  },

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "resource");

    // Drop the ENUM type
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_resource_sector";
    `);
  },
};