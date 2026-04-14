// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumRegulationAttachment extends Model {
        static associate(models) {
            // Attachment belongs to Attachment
            PetroleumRegulationAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });

            PetroleumRegulationAttachment.belongsTo(models.PetroleumRegulationProcess, {
                foreignKey: "petroleum_regulation_process_id",
                as: "regulation_process",
            });
        }
    }

    PetroleumRegulationAttachment.init(
        {
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            petroleum_regulation_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            petroleum_regulation_process_id: {
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
            modelName: "PetroleumRegulationAttachment",
            tableName: "petroleum_regulation_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return PetroleumRegulationAttachment;
};