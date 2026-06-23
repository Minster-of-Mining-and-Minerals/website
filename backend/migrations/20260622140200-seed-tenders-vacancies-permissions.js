"use strict";

const { v4: uuidv4 } = require("uuid");

const SUPER_ADMIN_ROLE_ID = "00000000-0000-4000-8000-000000000002";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const resources = ["tenders", "vacancies"];
    const actions = ["create", "read", "update", "delete", "publish"];

    for (const resource of resources) {
      for (const action of actions) {
        const permission_id = uuidv4();
        try {
          await queryInterface.bulkInsert(
            "permissions",
            [
              {
                permission_id,
                resource,
                action,
                created_at: now,
                updated_at: now,
              },
            ],
            { ignoreDuplicates: true },
          );

          const [rows] = await queryInterface.sequelize.query(
            `SELECT permission_id FROM permissions WHERE resource = '${resource}' AND action = '${action}' LIMIT 1;`,
          );

          const permId = rows?.[0]?.permission_id || permission_id;

          const [existing] = await queryInterface.sequelize.query(
            `SELECT role_permission_id FROM role_permissions WHERE role_id = '${SUPER_ADMIN_ROLE_ID}' AND permission_id = '${permId}' LIMIT 1;`,
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
        } catch (error) {
          if (error.name !== "SequelizeUniqueConstraintError") {
            throw error;
          }
        }
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", {
      resource: ["tenders", "vacancies"],
    });
  },
};
