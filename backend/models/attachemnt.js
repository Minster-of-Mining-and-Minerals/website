"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Attachment extends Model {
        static associate(models) {
            // Junction: Attachment ↔ NewsAttachment
            Attachment.hasMany(models.NewsAttachment, {
                foreignKey: "attachment_id",
                as: "newsAttachments",
            });

            Attachment.hasMany(models.BackgroundAttachment, {
                foreignKey: "attachment_id",
                as: "backgroundAttachments",
            });

            Attachment.hasMany(models.LeadershipAttachment, {
                foreignKey: "attachment_id",
                as: "leadershipAttachments",
            });

            Attachment.hasMany(models.PartnerAttachment, {
                foreignKey: "attachment_id",
                as: "partnerAttachments",
            });

            Attachment.hasMany(models.Slider, {
                foreignKey: "attachment_id",
                as: "sliders",
            });

            Attachment.hasMany(models.Card, {
                foreignKey: "attachment_id",
                as: "cards",
            });

            Attachment.hasMany(models.Gamestone, {
                foreignKey: "attachment_id",
                as: "gamestones",
            });

            Attachment.hasMany(models.GamestoneAttachment, {
                foreignKey: "attachment_id",
                as: "gamestoneAttachments",
            });

            Attachment.hasMany(models.ResourceAttachment, {
                foreignKey: "attachment_id",
                as: "resourceAttachments",
            });

            Attachment.hasMany(models.Snapshot, {
                foreignKey: "attachment_id",
                as: "snapshots",
            });

            Attachment.hasMany(models.ASMAttachment, {
                foreignKey: "attachment_id",
                as: "asmAttachments",
            });

            Attachment.hasMany(models.ASMPreview, {
                foreignKey: "attachment_id",
                as: "asmPreviews",
            });

            Attachment.hasMany(models.InvestigationStrategy, {
                foreignKey: "attachment_id",
                as: "investigationStrategies",
            });

            Attachment.hasMany(models.PetroleumAttachment, {
                foreignKey: "attachment_id",
                as: "petroleumAttachments",
            });
        }
    }

    Attachment.init(
        {
            attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            file_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            file_path: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            uploaded_by: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Attachment",
            tableName: "attachments",
            timestamps: false,
            underscored: true,
        },
    );

    return Attachment;
};