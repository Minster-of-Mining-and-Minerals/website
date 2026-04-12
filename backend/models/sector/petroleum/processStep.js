// models/process/process-step.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProcessStep extends Model {
        static associate(models) {
            // One process step has many steps
            ProcessStep.hasMany(models.Step, {
                foreignKey: "process_step_id",
                as: "steps",
            });

            ProcessStep.belongsTo(models.PetroleumProcess, {
                foreignKey: "petroleum_process_id",
                as: "petroleum_process",
            });
        }
    }

    ProcessStep.init(
        {
            process_step_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            petroleum_process_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            content: {
                type: DataTypes.JSON,
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
            modelName: "ProcessStep",
            tableName: "process_steps",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return ProcessStep;
}; 