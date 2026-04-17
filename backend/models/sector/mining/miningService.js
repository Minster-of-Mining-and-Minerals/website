"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningService extends Model {
        static associate(models) {

            MiningService.belongsTo(models.MiningRegulationProcess, {
                foreignKey: "mining_regulation_process_id",
                as: "mining_regulation_process",
            });

            MiningService.hasMany(models.MiningServiceCard, {
                foreignKey: "mining_service_id",
                as: "service_cards",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    MiningService.init(
        {
            mining_service_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            mining_regulation_process_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "mining_regulation_process",
                    key: "mining_regulation_process_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningService",
            tableName: "mining_service",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return MiningService;
};