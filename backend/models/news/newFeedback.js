"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsFeedback extends Model {
        static associate(models) {
            // News has many feedbacks
            NewsFeedback.belongsTo(models.News, {
                foreignKey: "news_id",
                as: "news",
            });
        }
    }
    NewsFeedback.init(
        {
            news_feedback_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            news_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            fullname: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            thought: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "NewsFeedback",
            tableName: "news_feedbacks",
            timestamps: false,
            underscored: true,
        }
    );

    return NewsFeedback;
};