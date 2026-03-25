"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Slider extends Model {
        static associate(models) {
            Slider.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    Slider.init(
        {
            slider_id: {
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

            // ✅ Single Image (like Footer)
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

            // Optional soft delete
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Slider",
            tableName: "sliders",
            timestamps: false,
            underscored: true,
        }
    );

    return Slider;
};