"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      service_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      icon: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.STRING(555),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("services");
  },
};