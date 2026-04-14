"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("petroleum_directive", {
      petroleum_directive_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      petroleum_regulation_process_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "petroleum_regulation_process",
          key: "petroleum_regulation_process_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      order: {
        type: Sequelize.INTEGER,
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

      type: {
        type: Sequelize.ENUM("main", "sub"),
        allowNull: false,
        defaultValue: "sub",
      },

      action_label: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      action: {
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
    await queryInterface.dropTable("petroleum_directive");
  },
};