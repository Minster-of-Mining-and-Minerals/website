"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Update mining_framework attachment_id constraint
    // We drop the existing constraint and add a new one with ON DELETE SET NULL
    await queryInterface.removeConstraint("mining_framework", "mining_framework_attachment_id_fkey");
    await queryInterface.addConstraint("mining_framework", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "mining_framework_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // 2. Update mining_guideline_attachments attachment_id constraint
    // We drop the existing constraint and add a new one with ON DELETE CASCADE
    await queryInterface.removeConstraint("mining_guideline_attachments", "mining_guideline_attachments_attachment_id_fkey");
    await queryInterface.addConstraint("mining_guideline_attachments", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "mining_guideline_attachments_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert mining_framework constraint
    await queryInterface.removeConstraint("mining_framework", "mining_framework_attachment_id_fkey");
    await queryInterface.addConstraint("mining_framework", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "mining_framework_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });

    // Revert mining_guideline_attachments constraint
    await queryInterface.removeConstraint("mining_guideline_attachments", "mining_guideline_attachments_attachment_id_fkey");
    await queryInterface.addConstraint("mining_guideline_attachments", {
      fields: ["attachment_id"],
      type: "foreign key",
      name: "mining_guideline_attachments_attachment_id_fkey",
      references: {
        table: "attachments",
        field: "attachment_id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
};
