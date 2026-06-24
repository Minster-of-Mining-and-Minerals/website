"use strict";

const {
  addColumnIfNotExists,
  removeColumnIfExists,
} = require("./lib/migration-utils");

/**
 * Production v1 databases already ran create-* migrations before columns
 * were merged into those files. This migration adds the missing v2 columns
 * idempotently after importing a server snapshot.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const string = (allowNull = true) => ({
      type: Sequelize.STRING(500),
      allowNull,
    });

    await addColumnIfNotExists(queryInterface, "attachments", "file_path_thumb", string());
    await addColumnIfNotExists(queryInterface, "attachments", "file_path_medium", string());
    await addColumnIfNotExists(queryInterface, "attachments", "file_path_large", string());
    await addColumnIfNotExists(queryInterface, "attachments", "mime_type", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await addColumnIfNotExists(queryInterface, "attachments", "width", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await addColumnIfNotExists(queryInterface, "attachments", "height", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await addColumnIfNotExists(queryInterface, "sliders", "button_name", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await addColumnIfNotExists(queryInterface, "sliders", "button_url", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
    await addColumnIfNotExists(queryInterface, "sliders", "button2_name", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await addColumnIfNotExists(queryInterface, "sliders", "button2_url", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await removeColumnIfExists(queryInterface, "sliders", "button2_url");
    await removeColumnIfExists(queryInterface, "sliders", "button2_name");
    await removeColumnIfExists(queryInterface, "sliders", "button_url");
    await removeColumnIfExists(queryInterface, "sliders", "button_name");

    await removeColumnIfExists(queryInterface, "attachments", "height");
    await removeColumnIfExists(queryInterface, "attachments", "width");
    await removeColumnIfExists(queryInterface, "attachments", "mime_type");
    await removeColumnIfExists(queryInterface, "attachments", "file_path_large");
    await removeColumnIfExists(queryInterface, "attachments", "file_path_medium");
    await removeColumnIfExists(queryInterface, "attachments", "file_path_thumb");
  },
};
