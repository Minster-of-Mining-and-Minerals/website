// models/process/step.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Step extends Model {
        static associate(models) {
            // Each step belongs to a process step
            Step.belongsTo(models.ProcessStep, {
                foreignKey: "process_step_id",
                as: "process",
            });

            Step.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    Step.init(
        {
            step_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            process_step_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            attachment_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "attachments",
                    key: "attachment_id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },

            order: {
                type: DataTypes.INTEGER,
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
            modelName: "Step",
            tableName: "steps",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return Step;
};