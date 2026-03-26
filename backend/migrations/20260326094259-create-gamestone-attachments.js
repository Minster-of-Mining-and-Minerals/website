"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("gamestone_attachments", {
      gamestone_attachment_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      gamestone_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "gamestones",
          key: "gamestone_id",
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("gamestone_attachments");
  },
};
