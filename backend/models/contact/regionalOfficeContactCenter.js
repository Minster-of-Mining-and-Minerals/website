// model/compliant-management/regional-office-contact-center.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RegionalOfficeContactCenter extends Model {
    static associate(models) {
      // Each office belongs to a region
      RegionalOfficeContactCenter.belongsTo(models.Region, {
        foreignKey: "region_id",
        as: "region",
      });

      // Each office can have multiple licensing contacts
      RegionalOfficeContactCenter.hasMany(models.LicensingContact, {
        foreignKey: "regional_office_id",
        as: "licensing_contacts",
      });
    }
  }

  RegionalOfficeContactCenter.init(
    {
      regional_office_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      region_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      bureau_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      director: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },

      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
      modelName: "RegionalOfficeContactCenter",
      tableName: "regional_office_contact_centers",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return RegionalOfficeContactCenter;
};
