"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("news_feedbacks", {
      news_feedback_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "news",
          key: "news_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      fullname: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      thought: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("news_feedbacks");
  },
};