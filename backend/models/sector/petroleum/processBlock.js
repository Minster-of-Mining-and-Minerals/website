// models/process/process-step.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProcessBlock extends Model {
        static associate(models) {

            ProcessBlock.belongsTo(models.PetroleumProcess, {
                foreignKey: "petroleum_process_id",
                as: "petroleum_process",
            });

            ProcessBlock.hasMany(models.ProcessBlockAttachment, {
                foreignKey: "process_block_id",
                as: "attachments",
            });
        }
    }

    ProcessBlock.init(
        {
            process_block_id: {
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
            modelName: "ProcessBlock",
            tableName: "process_blocks",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return ProcessBlock;
}; 