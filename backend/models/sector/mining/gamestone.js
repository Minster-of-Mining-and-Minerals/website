// models/gamestone/gamestone.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Gamestone extends Model {
        static associate(models) {
            // Main Image (ONE)
            Gamestone.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });

            // Additional attachments (MANY)
            Gamestone.hasMany(models.GamestoneAttachment, {
                foreignKey: "gamestone_id",
                as: "attachments",
            });

            // Self-relation (Parent → Children)
            Gamestone.hasMany(models.Gamestone, {
                foreignKey: "parent_id",
                as: "sub_items",
            });

            Gamestone.belongsTo(models.Gamestone, {
                foreignKey: "parent_id",
                as: "parent",
            });
        }
    }

    Gamestone.init(
        {
            gamestone_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Main image (single)
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

            discovered_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            // Self reference
            parent_id: {
                type: DataTypes.UUID,
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
            modelName: "Gamestone",
            tableName: "gamestones",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return Gamestone;
};