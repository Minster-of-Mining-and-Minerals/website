"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Strategy extends Model {
        static associate(models) {
            Strategy.hasMany(models.StrategySection, {
                foreignKey: "strategy_id",
                as: "sections",
            });
        }
    }

    Strategy.init(
        {
            strategy_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
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
            },
        },
        {
            sequelize,
            modelName: "Strategy",
            tableName: "strategies",
            timestamps: false,
            underscored: true,
        }
    );

    return Strategy;
};