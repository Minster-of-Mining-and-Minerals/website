"use strict";

const { v4: uuidv4 } = require("uuid");

const SUPER_ADMIN_ROLE_ID = "00000000-0000-4000-8000-000000000002";
const RESOURCES = ["opportunities", "tenders", "vacancies"];
const ACTIONS = ["create", "read", "update", "delete", "publish"];

/** Idempotent permission + Super Admin role link seeder for production deploys. */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    for (const resource of RESOURCES) {
      for (const action of ACTIONS) {
        const permission_id = uuidv4();

        await queryInterface.sequelize.query(
          `
          INSERT INTO permissions (permission_id, resource, action, is_active, created_at, updated_at)
          VALUES (:permission_id, :resource, :action, true, :now, :now)
          ON CONFLICT (resource, action) DO NOTHING;
          `,
          {
            replacements: { permission_id, resource, action, now },
          },
        );

        const [rows] = await queryInterface.sequelize.query(
          `SELECT permission_id FROM permissions WHERE resource = :resource AND action = :action LIMIT 1;`,
          { replacements: { resource, action } },
        );

        const permId = rows?.[0]?.permission_id;
        if (!permId) continue;

        const [existing] = await queryInterface.sequelize.query(
          `SELECT role_permission_id FROM role_permissions WHERE role_id = :roleId AND permission_id = :permId LIMIT 1;`,
          { replacements: { roleId: SUPER_ADMIN_ROLE_ID, permId } },
        );

        if (!existing?.length) {
          await queryInterface.bulkInsert("role_permissions", [
            {
              role_permission_id: uuidv4(),
              role_id: SUPER_ADMIN_ROLE_ID,
              permission_id: permId,
              is_active: true,
              created_at: now,
              updated_at: now,
            },
          ]);
        }
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", {
      resource: RESOURCES,
    });
  },
};
