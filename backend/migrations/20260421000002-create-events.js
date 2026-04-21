"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      event_category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "event_categories",
          key: "event_category_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      description: {
        type: Sequelize.TEXT,
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: Sequelize.STRING,
      virtual_link: Sequelize.TEXT,
      organizer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM(
          "draft",
          "scheduled",
          "published",
          "ongoing",
          "completed",
          "archived",
          "cancelled"
        ),
        defaultValue: "draft",
      },
      publish_start: Sequelize.DATE,
      publish_end: Sequelize.DATE,
      published_at: Sequelize.DATE,
      approved_by: Sequelize.UUID,
      approved_at: Sequelize.DATE,
      created_by: Sequelize.UUID,
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
      deleted_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("events");
  },
};
