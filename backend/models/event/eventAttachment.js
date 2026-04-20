"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventAttachment extends Model {
    static associate(models) {
      EventAttachment.belongsTo(models.Event, {
        foreignKey: "event_id",
        as: "event",
      });

      EventAttachment.belongsTo(models.Attachment, {
        foreignKey: "attachment_id",
        as: "attachment",
      });
    }
  }

  EventAttachment.init(
    {
      event_attachment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      attachment_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "EventAttachment",
      tableName: "event_attachments",
      timestamps: false,
      underscored: true,
    },
  );

  return EventAttachment;
};
