"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("partner_attachments", {
      partner_attachment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      category: {
        type: Sequelize.ENUM("logo", "gallery", "document"),
        allowNull: false,
        defaultValue: "logo",
      },
      partner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "partners",
          key: "partner_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the ENUM type first when dropping the table
    await queryInterface.dropTable("partner_attachments");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_partner_attachments_category";');
  },
};