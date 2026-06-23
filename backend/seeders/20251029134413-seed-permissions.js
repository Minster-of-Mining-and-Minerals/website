"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const crudActions = ["create", "read", "update", "delete"];
    const resourcesWithActions = [
      { resource: "dashboard", actions: ["view"] },
      { resource: "users", actions: [...crudActions, "assign_role"] },
      { resource: "roles", actions: [...crudActions, "assign_permission"] },
      { resource: "permissions", actions: crudActions },
      { resource: "news", actions: [...crudActions, "publish"] },
      { resource: "events", actions: [...crudActions, "publish"] },
      { resource: "event_categories", actions: crudActions },
      { resource: "tags", actions: crudActions },
      { resource: "hero", actions: crudActions },
      { resource: "about", actions: crudActions },
      { resource: "contact", actions: crudActions },
      { resource: "opportunities", actions: [...crudActions, "publish"] },
      { resource: "contact_messages", actions: ["read", "update", "delete"] },
      { resource: "footer", actions: crudActions },
      { resource: "investigate_ethiopia", actions: crudActions },
      { resource: "services", actions: crudActions },
      { resource: "asm", actions: crudActions },
      { resource: "mining_snapshots", actions: crudActions },
      { resource: "mining_gamestones", actions: crudActions },
      { resource: "mining_resources", actions: crudActions },
      { resource: "mining_application_processes", actions: crudActions },
      { resource: "mining_regulation_processes", actions: crudActions },
      { resource: "geothermal_snapshots", actions: crudActions },
      { resource: "geothermal_resources", actions: crudActions },
      { resource: "petroleum_snapshots", actions: crudActions },
      { resource: "petroleum_resources", actions: crudActions },
      { resource: "petroleum_processes", actions: [...crudActions, "publish"] },
      {
        resource: "petroleum_regulation_processes",
        actions: crudActions,
      },
      { resource: "attachments", actions: ["create", "read", "delete"] },
      { resource: "audit_logs", actions: ["read", "delete"] },
      { resource: "routes", actions: ["read", "update"] },
      { resource: "navigation", actions: crudActions },
    ];

    const permissions = resourcesWithActions.flatMap((r) =>
      r.actions.map((action) => ({
        resource: r.resource,
        action: action,
      })),
    );

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
          { ignoreDuplicates: true },
        );
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          console.log(
            `Permission ${perm.resource}:${perm.action} already exists, skipping...`,
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
