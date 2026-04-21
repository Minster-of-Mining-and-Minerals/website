"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Attachments
      Event.hasMany(models.EventAttachment, {
        foreignKey: "event_id",
        as: "attachments",
      });

      // Category (1-N)
      Event.belongsTo(models.EventCategory, {
        foreignKey: "event_category_id",
        as: "category",
      });
    }
  }

  Event.init(
    {
      event_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      
      event_category_id: {
        type: DataTypes.UUID,
        allowNull: true, // Optional
      },

      description: {
        type: DataTypes.TEXT,
      },

      // ================= TIME =================
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      // ================= LOCATION =================
      location: DataTypes.STRING,
      virtual_link: DataTypes.TEXT,

      // ================= ORGANIZATION =================
      organizer: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // ================= CONTENT =================
      content: {
        type: DataTypes.TEXT, // better than STRING
        comment: "Rich content (multi-language JSON or HTML)",
      },

      // ================= STATUS =================
      status: {
        type: DataTypes.ENUM(
          "draft",
          "scheduled",
          "published",
          "ongoing",
          "completed",
          "archived",
          "cancelled",
        ),
        defaultValue: "draft",
      },

      // ================= PUBLISH CONTROL =================
      publish_start: DataTypes.DATE,
      publish_end: DataTypes.DATE,
      published_at: DataTypes.DATE,

      // ================= APPROVAL =================
      approved_by: DataTypes.UUID,
      approved_at: DataTypes.DATE,

      // ================= SYSTEM =================
      created_by: DataTypes.UUID,

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events",
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );

  return Event;
};
