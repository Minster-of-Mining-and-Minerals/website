// models/event/eventCategory.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventCategory extends Model {
    static associate(models) {
      // A category can have many events
      EventCategory.hasMany(models.Event, {
        foreignKey: "event_category_id",
        as: "events",
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
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "EventCategory",
      tableName: "event_categories",
      timestamps: false,
      underscored: true,
    }
  );

  return EventCategory;
};
