// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class LeadershipAttachment extends Model {
        static associate(models) {
            // Attachment belongs to News
            LeadershipAttachment.belongsTo(models.Leadership, {
                foreignKey: "leadership_id",
                as: "leadership",
            });

            // Attachment belongs to Attachment
            LeadershipAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    LeadershipAttachment.init(
        {
            leadership_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            leadership_id: {
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
            modelName: "LeadershipAttachment",
            tableName: "leadership_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return LeadershipAttachment;
};