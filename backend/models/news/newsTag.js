// models/complaint-management/newsTag.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsTag extends Model {
        static associate(models) {
            NewsTag.belongsTo(models.News, {
                foreignKey: "news_id",
                as: "news",
            });

            NewsTag.belongsTo(models.Tag, {
                foreignKey: "tag_id",
                as: "tag",
            });
        }
    }

    NewsTag.init(
        {
            news_tag_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            news_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            tag_id: {
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
            modelName: "NewsTag",
            tableName: "news_tags",
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ["news_id", "tag_id"],
                },
            ],
        }
    );

    return NewsTag;
};
