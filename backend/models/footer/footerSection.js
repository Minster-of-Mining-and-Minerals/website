"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FooterSection extends Model {
    static associate(models) {
      FooterSection.belongsTo(models.Footer, {
        foreignKey: "footer_id",
        as: "footer",
      });
    }
  }

  FooterSection.init(
    {
      footer_section_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      footer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "footers",
          key: "footer_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      section_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      links: {
        type: DataTypes.JSON, // array of { label, url }
        allowNull: false,
        defaultValue: [],
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
      modelName: "FooterSection",
      tableName: "footer_sections",
      timestamps: false,
      underscored: true,
    },
  );

  return FooterSection;
};
