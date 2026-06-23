"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("attachments", "file_path_thumb", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
    await queryInterface.addColumn("attachments", "file_path_medium", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
    await queryInterface.addColumn("attachments", "file_path_large", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
    await queryInterface.addColumn("attachments", "mime_type", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    await queryInterface.addColumn("attachments", "width", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("attachments", "height", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("attachments", "file_path_thumb");
    await queryInterface.removeColumn("attachments", "file_path_medium");
    await queryInterface.removeColumn("attachments", "file_path_large");
    await queryInterface.removeColumn("attachments", "mime_type");
    await queryInterface.removeColumn("attachments", "width");
    await queryInterface.removeColumn("attachments", "height");
  },
};
