// models/complaint-management/newsRead.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class NewsRead extends Model {
        static associate(models) {
            NewsRead.belongsTo(models.News, {
                foreignKey: "news_id",
                as: "news",
            });
        }
    }

    NewsRead.init(
        {
            news_read_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            news_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            ip_address: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            total_read_time: {
                type: DataTypes.INTEGER, // seconds
                defaultValue: 0,
            },
            last_read_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "NewsRead",
            tableName: "news_reads",
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

    return NewsRead;
};
