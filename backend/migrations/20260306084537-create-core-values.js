"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("core_values", {
      value_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      section_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "strategy_sections",
          key: "section_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("core_values");
  },
};
