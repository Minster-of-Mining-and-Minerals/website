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
    await createTableIfNotExists(queryInterface, "steps", {
      step_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      process_step_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "process_steps",
          key: "process_step_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      order: {
        type: Sequelize.INTEGER,
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
    await dropTableIfExists(queryInterface, "steps");
  },
};