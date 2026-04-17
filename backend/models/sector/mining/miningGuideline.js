"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningGuideline extends Model {
        static associate(models) {

            MiningGuideline.hasMany(models.MiningGuidelineContent, {
                foreignKey: "mining_guideline_id",
                as: "contents",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });

            MiningGuideline.belongsTo(models.MiningRegulationProcess, {
                foreignKey: "mining_regulation_process_id",
                as: "mining_regulation_process",
            });

            MiningGuideline.hasMany(models.MiningGuidelineAttachment, {
                foreignKey: "mining_guideline_id",
                as: "attachments",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    MiningGuideline.init(
        {
            mining_guideline_id: {
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
                onDelete: "RESTRICT",
            },
            icon: {
                type: DataTypes.TEXT,
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
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningGuideline",
            tableName: "mining_guideline",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return MiningGuideline;
};