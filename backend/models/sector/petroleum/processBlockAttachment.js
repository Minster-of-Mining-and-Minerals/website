// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProcessBlockAttachment extends Model {
        static associate(models) {
            // Attachment belongs to Attachment
            ProcessBlockAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });

            // Attachment belongs to GeothermalObjective
            ProcessBlockAttachment.belongsTo(models.ProcessBlock, {
                foreignKey: "process_block_id",
                as: "process_block",
            });
        }
    }

    ProcessBlockAttachment.init(
        {
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            process_block_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            process_block_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "ProcessBlockAttachment",
            tableName: "process_block_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return ProcessBlockAttachment;
};