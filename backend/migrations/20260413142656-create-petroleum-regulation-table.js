"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("petroleum_regulation", {
      petroleum_regulation_id: {
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

      content: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },

      objectives: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },

      bullet_points: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
      },

      steps: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: [],
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
    await queryInterface.dropTable("petroleum_regulation");
  },
};