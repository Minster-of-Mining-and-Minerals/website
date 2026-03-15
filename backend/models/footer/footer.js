"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    static associate(models) {
      Footer.belongsTo(models.Attachment, {
        foreignKey: "attachment_id",
        as: "attachment",
      });
      Footer.hasMany(models.FooterSection, {
        foreignKey: "footer_id",
        as: "sections",
      });
    }
  }

  Footer.init(
    {
      footer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      attachment_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "attachments",
          key: "attachment_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      content: {
        type: DataTypes.TEXT,
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
    },
    {
      sequelize,
      modelName: "Footer",
      tableName: "footers",
      timestamps: false,
      underscored: true,
    },
  );

  return Footer;
};
