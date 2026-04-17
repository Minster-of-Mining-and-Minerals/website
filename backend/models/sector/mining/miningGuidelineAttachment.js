// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MiningGuidelineAttachment extends Model {
        static associate(models) {
            // Attachment belongs to News
            MiningGuidelineAttachment.belongsTo(models.MiningGuideline, {
                foreignKey: "mining_guideline_id",
                as: "mining_guideline",
            });

            // Attachment belongs to Attachment
            MiningGuidelineAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    MiningGuidelineAttachment.init(
        {
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mining_guideline_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            mining_guideline_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "mining_guideline",
                    key: "mining_guideline_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "attachments",
                    key: "attachment_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "MiningGuidelineAttachment",
            tableName: "mining_guideline_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return MiningGuidelineAttachment;
};