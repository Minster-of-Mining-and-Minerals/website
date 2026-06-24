"use strict";


const {
  createTableIfNotExists,
  dropTableIfExists,
  addColumnIfNotExists,
  removeColumnIfExists,
  addConstraintIfNotExists,
  dropConstraintIfExists,
  dropEnumIfExists,
} = require("./lib/migration-utils");
module.exports = {
  async up(queryInterface, Sequelize) {
    await createTableIfNotExists(queryInterface, "news_feedbacks", {
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

      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "news_feedbacks");
  },
};