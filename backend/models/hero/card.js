"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Card extends Model {
        static associate(models) {
            // Card belongs to one attachment (image)
            Card.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    Card.init(
        {
            card_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // ✅ Button fields
            button_name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            button_url: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },

            // ✅ Single image (like Footer/Slider)
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

            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Card",
            tableName: "cards",
            timestamps: false,
            underscored: true,
        }
    );

    return Card;
};