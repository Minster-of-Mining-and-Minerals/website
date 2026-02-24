// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class BackgroundAttachment extends Model {
        static associate(models) {
            // Attachment belongs to News
            BackgroundAttachment.belongsTo(models.Background, {
                foreignKey: "background_id",
                as: "background",
            });

            // Attachment belongs to Attachment
            BackgroundAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    BackgroundAttachment.init(
        {
            background_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            background_id: {
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
            modelName: "BackgroundAttachment",
            tableName: "background_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return BackgroundAttachment;
};