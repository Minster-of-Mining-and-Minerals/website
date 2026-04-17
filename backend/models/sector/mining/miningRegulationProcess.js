"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningRegulationProcess extends Model {
        static associate(models) {

            MiningRegulationProcess.hasMany(models.MiningFramework, {
                foreignKey: "mining_regulation_process_id",
                as: "frameworks",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })

            MiningRegulationProcess.hasMany(models.MiningGuideline, {
                foreignKey: "mining_regulation_process_id",
                as: "guidelines",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })

            MiningRegulationProcess.hasMany(models.MiningService, {
                foreignKey: "mining_regulation_process_id",
                as: "services",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        }
    }

    MiningRegulationProcess.init(
        {
            mining_regulation_process_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            publish: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningRegulationProcess",
            tableName: "mining_regulation_process",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return MiningRegulationProcess;
};