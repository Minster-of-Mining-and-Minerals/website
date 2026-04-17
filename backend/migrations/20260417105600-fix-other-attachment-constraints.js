"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Update snapshot attachment_id constraint
    // Drop existing restrict constraint and add CASCADE (since it's usually required for snapshot)
    // Actually SET NULL is safer if the snapshot should remain without an image.
    // In snapshot table, attachment_id is allowNull: false. So SET NULL won't work unless we change that.
    // I'll use CASCADE for now as snapshots usually need an image.
    
    await queryInterface.removeConstraint("snapshot", "snapshot_attachment_id_fkey");
    await queryInterface.addConstraint("snapshot", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "snapshot_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // 2. Update steps attachment_id constraint
    await queryInterface.removeConstraint("steps", "steps_attachment_id_fkey");
    await queryInterface.addConstraint("steps", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "steps_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("snapshot", "snapshot_attachment_id_fkey");
    await queryInterface.addConstraint("snapshot", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "snapshot_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    await queryInterface.removeConstraint("steps", "steps_attachment_id_fkey");
    await queryInterface.addConstraint("steps", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "steps_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
};
