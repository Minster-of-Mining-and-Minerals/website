"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("process_block_attachments", {
      process_block_attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      process_block_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "process_blocks",
          key: "process_block_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("process_block_attachments");
  },
};