// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ResourceAttachment extends Model {
        static associate(models) {
            // Attachment belongs to News
            ResourceAttachment.belongsTo(models.Resource, {
                foreignKey: "resource_id",
                as: "resource",
            });

            // Attachment belongs to Attachment
            ResourceAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    ResourceAttachment.init(
        {
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            resource_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            resource_id: {
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
            modelName: "ResourceAttachment",
            tableName: "resource_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return ResourceAttachment;
};