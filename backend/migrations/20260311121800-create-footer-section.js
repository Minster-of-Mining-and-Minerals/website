"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("footer_sections", {
      footer_section_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      footer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "footers",
          key: "footer_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      section_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      links: {
        type: Sequelize.JSON, // array of { label, url }
        allowNull: false,
        defaultValue: [],
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
    await queryInterface.dropTable("footer_sections");
  },
};
