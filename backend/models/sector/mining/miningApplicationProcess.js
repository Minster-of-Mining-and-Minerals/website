"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningApplicationProcess extends Model {
        static associate(models) {

            // ✅ FIXED NAME
            MiningApplicationProcess.hasMany(models.MiningApplicationProcessAttachment, {
                foreignKey: "mining_application_process_id",
                as: "attachments",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });

            MiningApplicationProcess.hasMany(models.MiningApplicationTypes, {
                foreignKey: "mining_application_process_id",
                as: "application_types",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    MiningApplicationProcess.init(
        {
            mining_application_process_id: {
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
            objectives: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
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
            modelName: "MiningApplicationProcess",
            tableName: "mining_application_process",
            timestamps: true,              // ✅ REQUIRED
            paranoid: true,
            underscored: true,
        }
    );

    return MiningApplicationProcess;
};