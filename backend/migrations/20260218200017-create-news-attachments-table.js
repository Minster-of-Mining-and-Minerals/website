"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("news_attachments", {
      news_attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "news", key: "news_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "attachments", key: "attachment_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category: {
        type: Sequelize.ENUM("headline", "body", "footer"),
        allowNull: false,
        defaultValue: "body",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("news_attachments");
  },
};
