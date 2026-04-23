"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("route_translations", {
      route_translation_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      route_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "routes",
          key: "route_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      language_code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      label: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex("route_translations", ["route_id"]);
    await queryInterface.addIndex("route_translations", ["language_code"]);

    // Add unique constraint to prevent duplicate translations for same route and language
    await queryInterface.addConstraint("route_translations", {
      fields: ["route_id", "language_code"],
      type: "unique",
      name: "unique_route_language",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("route_translations");
  },
};