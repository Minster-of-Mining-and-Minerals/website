"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("petroleum_attachments", {
      petroleum_attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      petroleum_objective_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "petroleum_objective",
          key: "petroleum_objective_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "attachments", // make sure this table exists
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

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("petroleum_attachments");
  },
};