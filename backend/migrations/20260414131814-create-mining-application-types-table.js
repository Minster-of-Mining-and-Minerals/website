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
    await createTableIfNotExists(queryInterface, "mining_application_types", {
      mining_application_types_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      mining_application_process_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "mining_application_process",
          key: "mining_application_process_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      icon: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      requirements: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },

      steps: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },

      action_label: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      action_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      color: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await dropTableIfExists(queryInterface, "mining_application_types");
  },
};