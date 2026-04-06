"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("asm_attachments", {
      asm_attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      asm_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "asm",
          key: "asm_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // Note: Assuming there is an attachments table
        // If not, remove references or adjust accordingly
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("asm_attachments");
  },
};