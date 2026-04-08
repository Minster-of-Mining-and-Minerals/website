// models/complaint-management/complaintAttachment.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumAttachment extends Model {
        static associate(models) {
            // Attachment belongs to Attachment
            PetroleumAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });

            // Attachment belongs to GeothermalObjective
            PetroleumAttachment.belongsTo(models.PetroleumObjective, {
                foreignKey: "petroleum_objective_id",
                as: "objective",
            });
        }
    }

    PetroleumAttachment.init(
        {
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            petroleum_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            petroleum_objective_id: {
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
            modelName: "PetroleumAttachment",
            tableName: "petroleum_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return PetroleumAttachment;
};