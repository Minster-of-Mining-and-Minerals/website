"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("news", "status", {
      type: Sequelize.ENUM("draft", "published", "archived"),
      allowNull: false,
      defaultValue: "draft",
    });

    await queryInterface.addColumn("news", "published_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("news", "status");
    await queryInterface.removeColumn("news", "published_at");
    // Note: To truly undo the ENUM type in some databases (like PostgreSQL), 
    // you might need additional commands, but this is the standard Sequelize way.
  },
};
