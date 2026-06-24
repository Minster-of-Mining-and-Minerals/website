"use strict";

const { addConstraintIfNotExists, dropConstraintIfExists, createTableIfNotExists, dropTableIfExists } = require("./lib/migration-utils");

module.exports = {
  async up(queryInterface, Sequelize) {
    await createTableIfNotExists(queryInterface, "permissions", {
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      resource: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      action: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await addConstraintIfNotExists(queryInterface, "permissions", {
      fields: ["resource", "action"],
      type: "unique",
      name: "uq_permissions_resource_action",
    });
  },

  async down(queryInterface) {
    await dropConstraintIfExists(queryInterface, "permissions", "uq_permissions_resource_action");
    await dropTableIfExists(queryInterface, "permissions");
  },
};
