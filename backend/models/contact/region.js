// model/compliant-management/region.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      // Each office can have multiple RegionalOfficeContactCenter
      Region.hasMany(models.RegionalOfficeContactCenter, {
        foreignKey: "region_id",
        as: "regional_offices",
      });
    }
  }

  Region.init(
    {
      region_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      modelName: "Region",
      tableName: "regions",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return Region;
};
