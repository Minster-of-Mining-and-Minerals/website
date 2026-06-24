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
    await createTableIfNotExists(queryInterface, "news_metadata", {
      news_metadata_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: { model: "news", key: "news_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislike_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      read_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      average_read_time: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "news_metadata");
  },
};
