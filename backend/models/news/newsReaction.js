// models/complaint-management/newsReaction.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsReaction extends Model {
        static associate(models) {
            NewsReaction.belongsTo(models.News, {
                foreignKey: "news_id",
                as: "news",
            });
        }
    }

    NewsReaction.init(
        {
            news_reaction_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            news_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            ip_address: {
                type: DataTypes.STRING(45), // IPv4 + IPv6
                allowNull: false,
            },
            reaction: {
                type: DataTypes.ENUM("like", "dislike"),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "NewsReaction",
            tableName: "news_reactions",
            timestamps: false,
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ["news_id", "ip_address"],
                },
            ],
        }
    );

    return NewsReaction;
};
