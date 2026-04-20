"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("news", {
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      content: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      author: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
<<<<<<< HEAD
      // ✅ STATUS (Draft / Published / Archived)
      status: {
        type: Sequelize.ENUM("draft", "published", "archived"),
        allowNull: false,
        defaultValue: "draft",
      },

      // ✅ WHEN IT WAS PUBLISHED
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
=======
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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
    await queryInterface.dropTable("news");
  },
};
