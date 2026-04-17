"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mining_framework", {
      mining_framework_id: {
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
        allowNull: false,
      },
      objectives: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },
      attachment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      attachment_overlay_text: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: "Mining Framework",
      },
      attachment_overlay_color: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: "#ffffff",
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
    await queryInterface.dropTable("mining_framework");
  },
};