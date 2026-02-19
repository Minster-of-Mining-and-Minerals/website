// models/news/newsMetadata.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsMetadata extends Model {
        static associate(models) {
            NewsMetadata.belongsTo(models.News, {
                foreignKey: "news_id",
                as: "news",
            });
        }
    }

    NewsMetadata.init(
        {
            news_metadata_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            news_id: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
            },
            like_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            dislike_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            read_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            average_read_time: {
                type: DataTypes.INTEGER, // seconds
                defaultValue: 0,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "NewsMetadata",
            tableName: "news_metadata",
            timestamps: false,
            underscored: true,
        }
    );

    return NewsMetadata;
};
