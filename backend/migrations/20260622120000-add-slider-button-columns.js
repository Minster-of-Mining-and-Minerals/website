"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sliders", "button_name", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    await queryInterface.addColumn("sliders", "button_url", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    await queryInterface.addColumn("sliders", "button2_name", {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    await queryInterface.addColumn("sliders", "button2_url", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("sliders", "button2_url");
    await queryInterface.removeColumn("sliders", "button2_name");
    await queryInterface.removeColumn("sliders", "button_url");
    await queryInterface.removeColumn("sliders", "button_name");
  },
};
