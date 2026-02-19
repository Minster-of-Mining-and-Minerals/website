// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsAttachment extends Model {
        static associate(models) {
            // Attachment belongs to News
            NewsAttachment.belongsTo(models.News, {
                foreignKey: "news_id",
                as: "news",
            });

            // Attachment belongs to Attachment
            NewsAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    NewsAttachment.init(
        {
            category: {
                type: DataTypes.ENUM("headline", "body", "footer"),
                allowNull: false,
                defaultValue: "body",
            },
            news_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            news_id: {
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
            modelName: "NewsAttachment",
            tableName: "news_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return NewsAttachment;
};