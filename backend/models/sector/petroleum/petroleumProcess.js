// models/process/process-step.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumProcess extends Model {
        static associate(models) {
            // One process step has many steps
            PetroleumProcess.hasMany(models.ProcessStep, {
                foreignKey: "petroleum_process_id",
                as: "process_steps",
            });

            PetroleumProcess.hasMany(models.ProcessBlock, {
                foreignKey: "petroleum_process_id",
                as: "process_blocks",
            });
        }
    }

    PetroleumProcess.init(
        {
            petroleum_process_id: {
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
                allowNull: true,
            },

            published: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
            modelName: "PetroleumProcess",
            tableName: "petroleum_processes",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return PetroleumProcess;
}; 