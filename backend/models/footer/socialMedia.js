"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate(models) {
      // No associations for now
    }
  }

  SocialMedia.init(
    {
      social_media_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      platform_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          isUrl: true,
        },
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
      modelName: "SocialMedia",
      tableName: "social_medias",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return SocialMedia;
};
