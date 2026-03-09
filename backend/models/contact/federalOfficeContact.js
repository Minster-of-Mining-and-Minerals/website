// model/compliant-management/federal-office-contact.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FederalOfficeContact extends Model {
    static associate(models) {
      // If later needed, you could relate federal office to regions or departments
      // Example: FederalOfficeContact.belongsTo(models.Region, { foreignKey: "region_id", as: "region" });
    }
  }

  FederalOfficeContact.init(
    {
      federal_office_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      office_address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },

      map_location: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: "Can store map URL or coordinates",
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
      modelName: "FederalOfficeContact",
      tableName: "federal_office_contacts",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return FederalOfficeContact;
};
