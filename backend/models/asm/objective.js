"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Objective extends Model {
        static associate(models) {
            // define associations here later if needed
            Objective.belongsTo(models.ASM, {
                foreignKey: "asm_id",
                as: "asm",
            });
        }
    }

    Objective.init(
        {
            objective_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            asm_id: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM("headlines", "strategic_objective", "economic_impact", "impact_contribution", "strategic_pillars", "key_initiatives", "objectives"),
                allowNull: false,
                defaultValue: "objectives",
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            foot_note: {
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
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Objective",
            tableName: "objectives",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return Objective;
};