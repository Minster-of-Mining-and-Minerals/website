"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventCategory extends Model {
    static associate(models) {
      EventCategory.belongsTo(models.Event, {
        foreignKey: "event_id",
        as: "event",
      });
    }
  }

  EventCategory.init(
    {
      event_category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EventCategory", 
      tableName: "event_categories", 
      timestamps: false,
      underscored: true,
    },
  );

  return EventCategory;
};
