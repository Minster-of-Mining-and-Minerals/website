// model/compliant-management/licensing-contact.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LicensingContact extends Model {
    static associate(models) {
      LicensingContact.belongsTo(models.RegionalOfficeContactCenter, {
        foreignKey: "regional_office_id",
        as: "regional_office",
      });
    }
  }

  LicensingContact.init(
    {
      licensing_contact_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      regional_office_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      modelName: "LicensingContact",
      tableName: "licensing_contacts",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return LicensingContact;
};
