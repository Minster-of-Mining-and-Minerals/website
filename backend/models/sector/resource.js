// model/compliant-management/compliant.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Resource extends Model {
        static associate(models) {
            // Resource can have many attachments
            Resource.hasMany(models.ResourceAttachment, {
                foreignKey: "resource_id",
                as: "attachments",
            });
        }
    }

    Resource.init(
        {
            resource_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            sector: {
                type: DataTypes.ENUM("mining", "geology", "petroleum", "other"),
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
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
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Resource",
            tableName: "resource",
            timestamps: false,
            underscored: true,
            paranoid: true,
        },
    );

    return Resource;
};