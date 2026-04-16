"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MiningApplicationProcessAttachment extends Model {
        static associate(models) {

            MiningApplicationProcessAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });

            MiningApplicationProcessAttachment.belongsTo(models.MiningApplicationProcess, {
                foreignKey: "mining_application_process_id",
                as: "mining_application_process",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    MiningApplicationProcessAttachment.init(
        {
            mining_application_process_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            mining_application_process_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            overlay_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            overlay_icon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "MiningApplicationProcessAttachment",
            tableName: "mining_application_process_attachments",
            timestamps: true,  // ✅ keep consistent
            underscored: true,
        }
    );

    return MiningApplicationProcessAttachment;
};