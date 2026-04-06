"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ASMPreview extends Model {
        static associate(models) {
            ASMPreview.belongsTo(models.ASM, {
                foreignKey: "asm_id",
                as: "asm",
            });

            ASMPreview.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    ASMPreview.init(
        {
            preview_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            asm_id: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "attachments",
                    key: "attachment_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
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
            modelName: "ASMPreview",
            tableName: "asm_previews",
            timestamps: false,
            underscored: true,
        }
    );

    return ASMPreview;
};