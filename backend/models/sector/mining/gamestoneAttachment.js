// models/gamestone/gamestoneAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class GamestoneAttachment extends Model {
        static associate(models) {
            GamestoneAttachment.belongsTo(models.Gamestone, {
                foreignKey: "gamestone_id",
                as: "gamestone",
            });

            GamestoneAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    GamestoneAttachment.init(
        {
            gamestone_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            gamestone_id: {
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
            modelName: "GamestoneAttachment",
            tableName: "gamestone_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return GamestoneAttachment;
};