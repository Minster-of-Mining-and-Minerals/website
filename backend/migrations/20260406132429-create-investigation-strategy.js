"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("investigation_strategy", {
      investigation_strategy_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      investigate_ethiopia_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "investigate_ethiopia",
          key: "investigate_ethiopia_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM(
          "headlines",
          "strategic_minerals",
          "autonomy",
          "autonomous_institutions",
          "strategic_pillars",
          "ambition",
          "global_proclamation"
        ),
        allowNull: false,
        defaultValue: "headlines",
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bg_color: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "#0b102dff",
      },
      fg_color: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "#FFFFFF",
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("investigation_strategy");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_investigation_strategy_type";'
    );
  },
};