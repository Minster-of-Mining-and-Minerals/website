"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const permissions = [
      // Dashboard Access
      { resource: "dashboard", action: "view" },

      // User & Identity Management
      { resource: "users", action: "create" },
      { resource: "users", action: "read" },
      { resource: "users", action: "update" },
      { resource: "users", action: "delete" },
      { resource: "users", action: "assign_role" },

      { resource: "roles", action: "create" },
      { resource: "roles", action: "read" },
      { resource: "roles", action: "update" },
      { resource: "roles", action: "delete" },
      { resource: "roles", action: "assign_permission" },

      { resource: "permissions", action: "read" },
      { resource: "permissions", action: "update" },

      // Public Content Management
      { resource: "news", action: "create" },
      { resource: "news", action: "read" },
      { resource: "news", action: "update" },
      { resource: "news", action: "delete" },

      { resource: "tags", action: "create" },
      { resource: "tags", action: "read" },
      { resource: "tags", action: "update" },
      { resource: "tags", action: "delete" },

      { resource: "hero", action: "create" },
      { resource: "hero", action: "read" },
      { resource: "hero", action: "update" },
      { resource: "hero", action: "delete" },

      { resource: "about", action: "read" },
      { resource: "about", action: "update" },

      { resource: "contact", action: "read" },
      { resource: "contact", action: "update" },

      { resource: "contact_messages", action: "read" },
      { resource: "contact_messages", action: "update" },
      { resource: "contact_messages", action: "delete" },

      { resource: "footer", action: "read" },
      { resource: "footer", action: "update" },

      { resource: "investigate_ethiopia", action: "read" },
      { resource: "investigate_ethiopia", action: "update" },

      { resource: "services", action: "create" },
      { resource: "services", action: "read" },
      { resource: "services", action: "update" },
      { resource: "services", action: "delete" },

      { resource: "asm", action: "read" },
      { resource: "asm", action: "update" },

      // Sector: Mining
      { resource: "mining_snapshots", action: "create" },
      { resource: "mining_snapshots", action: "read" },
      { resource: "mining_snapshots", action: "update" },
      { resource: "mining_snapshots", action: "delete" },

      { resource: "mining_gamestones", action: "create" },
      { resource: "mining_gamestones", action: "read" },
      { resource: "mining_gamestones", action: "update" },
      { resource: "mining_gamestones", action: "delete" },

      { resource: "mining_resources", action: "create" },
      { resource: "mining_resources", action: "read" },
      { resource: "mining_resources", action: "update" },
      { resource: "mining_resources", action: "delete" },

      { resource: "mining_application_processes", action: "create" },
      { resource: "mining_application_processes", action: "read" },
      { resource: "mining_application_processes", action: "update" },
      { resource: "mining_application_processes", action: "delete" },

      { resource: "mining_regulation_processes", action: "create" },
      { resource: "mining_regulation_processes", action: "read" },
      { resource: "mining_regulation_processes", action: "update" },
      { resource: "mining_regulation_processes", action: "delete" },

      // Sector: Geothermal
      { resource: "geothermal_snapshots", action: "create" },
      { resource: "geothermal_snapshots", action: "read" },
      { resource: "geothermal_snapshots", action: "update" },
      { resource: "geothermal_snapshots", action: "delete" },

      { resource: "geothermal_resources", action: "create" },
      { resource: "geothermal_resources", action: "read" },
      { resource: "geothermal_resources", action: "update" },
      { resource: "geothermal_resources", action: "delete" },

      // Sector: Petroleum
      { resource: "petroleum_snapshots", action: "create" },
      { resource: "petroleum_snapshots", action: "read" },
      { resource: "petroleum_snapshots", action: "update" },
      { resource: "petroleum_snapshots", action: "delete" },

      { resource: "petroleum_resources", action: "create" },
      { resource: "petroleum_resources", action: "read" },
      { resource: "petroleum_resources", action: "update" },
      { resource: "petroleum_resources", action: "delete" },

      { resource: "petroleum_processes", action: "create" },
      { resource: "petroleum_processes", action: "read" },
      { resource: "petroleum_processes", action: "update" },
      { resource: "petroleum_processes", action: "delete" },
      { resource: "petroleum_processes", action: "publish" },

      { resource: "petroleum_regulation_processes", action: "create" },
      { resource: "petroleum_regulation_processes", action: "read" },
      { resource: "petroleum_regulation_processes", action: "update" },
      { resource: "petroleum_regulation_processes", action: "delete" },

      // System
      { resource: "attachments", action: "create" },
      { resource: "attachments", action: "read" },
      { resource: "attachments", action: "delete" },
    ];

    for (const perm of permissions) {
      try {
        await queryInterface.bulkInsert(
          "permissions",
          [
            {
              permission_id: uuidv4(),
              resource: perm.resource,
              action: perm.action,
              created_at: now,
              updated_at: now,
            },
          ],
          { ignoreDuplicates: true }
        );
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          console.log(
            `Permission ${perm.resource}:${perm.action} already exists, skipping...`
          );
          continue;
        }
        throw error;
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
