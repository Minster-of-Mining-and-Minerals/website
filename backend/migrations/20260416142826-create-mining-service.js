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
    await createTableIfNotExists(queryInterface, "mining_service", {
      mining_service_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      mining_regulation_process_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "mining_regulation_process",
          key: "mining_regulation_process_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
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

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "mining_service");
  },
};