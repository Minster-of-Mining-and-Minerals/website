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
    await createTableIfNotExists(queryInterface, "snapshot", {
      snapshot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      sector: {
        type: Sequelize.ENUM("mining", "geothermal", "petroleum", "others"),
        allowNull: false,
      },

      description_one: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      description_two: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      attachment_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
    await dropTableIfExists(queryInterface, "snapshot");
    await dropEnumIfExists(queryInterface, "enum_snapshot_sector");
  },
};