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

            News.belongsToMany(models.Tag, {
                through: models.NewsTag,
                foreignKey: "news_id",
                otherKey: "tag_id",
                as: "tags",
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
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
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