"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningFramework extends Model {
        static associate(models) {

            MiningFramework.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });

            MiningFramework.belongsTo(models.MiningRegulationProcess, {
                foreignKey: "mining_regulation_process_id",
                as: "mining_regulation_process",
            });
        }
    }

    MiningFramework.init(
        {
            mining_framework_id: {
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
                allowNull: false,
            },
            objectives: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },

            // Image fields
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "attachments",
                    key: "attachment_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },

            attachment_overlay_text: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: "Mining Framework",
            },
            attachment_overlay_color: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: "#ffffff",
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningFramework",
            tableName: "mining_framework",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return MiningFramework;
};