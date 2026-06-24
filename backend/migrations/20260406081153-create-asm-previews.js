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
    await createTableIfNotExists(queryInterface, "asm_previews", {
      preview_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      asm_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "asm",
          key: "asm_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      attachment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    });
  },

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "asm_previews");
  },
};