// model/compliant-management/compliant.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        static associate(models) {
            // News can have many attachments
            News.hasMany(models.NewsAttachment, {
                foreignKey: "news_id",
                as: "attachments",
            });

            News.hasOne(models.NewsMetadata, {
                foreignKey: "news_id",
                as: "metadata",
            });

            News.hasMany(models.NewsReaction, {
                foreignKey: "news_id",
                as: "reactions",
            });

            News.hasMany(models.NewsRead, {
                foreignKey: "news_id",
                as: "reads",
            });

            News.hasMany(models.NewsTag, {
                foreignKey: "news_id",
                as: "tag_links",
            });

            News.hasMany(models.NewsFeedback, {
                foreignKey: "news_id",
                as: "feedbacks",
            });

        }
    }

    News.init(
        {
            news_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            content: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            author: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            status: {
                type: DataTypes.ENUM("draft", "published", "archived"),
                defaultValue: "draft",
                allowNull: false,
            },
            published_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "News",
            tableName: "news",
            timestamps: false,
            underscored: true,
            paranoid: true,
        },
    );

    return News;
};