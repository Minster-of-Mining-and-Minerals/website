"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    static associate(models) {
      Vacancy.belongsTo(models.Attachment, {
        foreignKey: "attachment_id",
        as: "attachment",
      });
    }
  }

  Vacancy.init(
    {
      vacancy_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      job_title: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      employment_type: {
        type: DataTypes.ENUM("full_time", "contract", "part_time"),
        allowNull: false,
        defaultValue: "full_time",
      },
      positions: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      requirements: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      published_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      application_deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      attachment_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "closed"),
        allowNull: false,
        defaultValue: "draft",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Vacancy",
      tableName: "vacancies",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return Vacancy;
};
