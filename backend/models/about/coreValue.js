"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CoreValue extends Model {
        static associate(models) {
            CoreValue.belongsTo(models.StrategySection, {
                foreignKey: "section_id",
                as: "section",
            });
        }
    }

    CoreValue.init(
        {
            value_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            section_id: { // links to core_values section
                type: DataTypes.UUID,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            icon: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: "CoreValue",
            tableName: "core_values",
            timestamps: false,
            underscored: true,
        }
    );

    return CoreValue;
};