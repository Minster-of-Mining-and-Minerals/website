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
    await createTableIfNotExists(queryInterface, "petroleum_objective", {
      petroleum_objective_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      type: {
        type: Sequelize.ENUM("headline", "others"),
        allowNull: false,
        defaultValue: "others",
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      objectives: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "petroleum_objective");

    // Important: drop ENUM manually (Postgres only)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_petroleum_objective_type";'
    );
  },
};