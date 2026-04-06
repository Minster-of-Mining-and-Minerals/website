"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ASMAttachment extends Model {
        static associate(models) {
            // Attachment belongs to ASM
            ASMAttachment.belongsTo(models.ASM, {
                foreignKey: "asm_id",
                as: "asm",
            });

            // Attachment belongs to Attachment
            ASMAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    ASMAttachment.init(
        {
            asm_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            label: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            asm_id: {
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
        },
        {
            sequelize,
            modelName: "ASMAttachment",
            tableName: "asm_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return ASMAttachment;
};