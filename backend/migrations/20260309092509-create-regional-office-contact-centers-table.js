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
    await createTableIfNotExists(queryInterface, "regional_office_contact_centers", {
      regional_office_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      region_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "regions", key: "region_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      bureau_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      director: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await dropTableIfExists(queryInterface, "regional_office_contact_centers");
  },
};
