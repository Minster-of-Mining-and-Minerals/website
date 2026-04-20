"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remove ANY existing unique constraints on the 'resource' column.
    // We've found multiple constraints like 'permissions_resource_key1', 'permissions_resource_key2', etc.
    const [constraints] = await queryInterface.sequelize.query(`
      SELECT conname
      FROM pg_constraint c
      JOIN pg_attribute a ON a.attnum = ANY(c.conkey)
      JOIN pg_class t ON t.oid = c.conrelid
      WHERE t.relname = 'permissions' 
      AND c.contype = 'u' 
      AND a.attname = 'resource'
      AND array_length(c.conkey, 1) = 1;
    `);

    for (const constraint of constraints) {
      console.log(`Dropping constraint: ${constraint.conname}`);
      await queryInterface.removeConstraint("permissions", constraint.conname);
    }

    // 2. Add a new composite unique constraint on (resource, action)
    // First, remove it if it already exists (to avoid conflicts if re-running)
    try {
      await queryInterface.removeConstraint("permissions", "permissions_resource_action_unique");
    } catch (e) {
      // Ignore
    }

    await queryInterface.addConstraint("permissions", {
      fields: ["resource", "action"],
      type: "unique",
      name: "permissions_resource_action_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    // 1. Remove the composite unique constraint
    try {
      await queryInterface.removeConstraint("permissions", "permissions_resource_action_unique");
    } catch (error) {
       console.log("Note: Could not find constraint 'permissions_resource_action_unique'.");
    }
  },
};