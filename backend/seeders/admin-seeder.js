'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminEmail = "admin@gmail.com";
    const roleName = "Super Admin";

    // 1. Find existing admin user and role to delete their associations
    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id FROM users WHERE email = '${adminEmail}'`
    );
    const adminUserId = users.length ? users[0].user_id : null;

    const [roles] = await queryInterface.sequelize.query(
      `SELECT role_id FROM roles WHERE name = '${roleName}'`
    );
    const superAdminRoleId = roles.length ? roles[0].role_id : null;

    // Delete associations
    if (adminUserId) {
      await queryInterface.sequelize.query(
        `DELETE FROM user_roles WHERE user_id = '${adminUserId}'`
      );
    }
    
    if (superAdminRoleId) {
      await queryInterface.sequelize.query(
        `DELETE FROM role_permissions WHERE role_id = '${superAdminRoleId}'`
      );
      await queryInterface.sequelize.query(
        `DELETE FROM user_roles WHERE role_id = '${superAdminRoleId}'`
      );
    }

    // Delete role and user
    if (superAdminRoleId) {
      await queryInterface.sequelize.query(
        `DELETE FROM roles WHERE role_id = '${superAdminRoleId}'`
      );
    }
    if (adminUserId) {
      await queryInterface.sequelize.query(
        `DELETE FROM users WHERE user_id = '${adminUserId}'`
      );
    }

    // 2. Insert new Admin user and Super Admin role
    const newUserId = "00000000-0000-4000-8000-000000000001";
    const newRoleId = "00000000-0000-4000-8000-000000000002";
    
    const hashedPassword = await bcrypt.hash("#Admin123", 10);

    await queryInterface.bulkInsert('users', [{
      user_id: newUserId,
      full_name: "Admin Account",
      email: adminEmail,
      password: hashedPassword,
      phone_number: "251911000001",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    await queryInterface.bulkInsert('roles', [{
      role_id: newRoleId,
      name: roleName,
      description: "Full access to all resources and actions.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // 3. Assign user to role
    await queryInterface.bulkInsert('user_roles', [{
      user_role_id: uuidv4(),
      user_id: newUserId,
      role_id: newRoleId,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // 4. Assign all permissions to the Super Admin role
    const [permissions] = await queryInterface.sequelize.query(
      `SELECT permission_id FROM permissions`
    );

    if (permissions.length > 0) {
      const rolePermissionsData = permissions.map(p => ({
        role_permission_id: uuidv4(),
        role_id: newRoleId,
        permission_id: p.permission_id,
        created_at: new Date(),
        updated_at: new Date()
      }));

      await queryInterface.bulkInsert('role_permissions', rolePermissionsData);
    }
    
    console.log("Admin account recreated successfully.");
  },

  down: async (queryInterface, Sequelize) => {
    // Optional revert logic
  }
};
