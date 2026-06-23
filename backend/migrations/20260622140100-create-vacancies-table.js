"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vacancies", {
      vacancy_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      job_title: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      employment_type: {
        type: Sequelize.ENUM("full_time", "contract", "part_time"),
        allowNull: false,
        defaultValue: "full_time",
      },
      positions: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      requirements: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      published_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      application_deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      attachment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: Sequelize.ENUM("draft", "published", "closed"),
        allowNull: false,
        defaultValue: "draft",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("vacancies", ["status"]);
    await queryInterface.addIndex("vacancies", ["application_deadline"]);
    await queryInterface.addIndex("vacancies", ["deleted_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("vacancies");
  },
};
