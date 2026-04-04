"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Snapshot extends Model {
        static associate(models) {
            // One snapshot has many dynamic sections
            Snapshot.hasMany(models.SnapshotSection, {
                foreignKey: "snapshot_id",
                as: "sections",
            });

            Snapshot.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    Snapshot.init(
        {
            snapshot_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            sector: {
                type: DataTypes.ENUM("mining", "geothermal", "petroleum", "others"),
                allowNull: false,
            },

            // Two description sections
            description_one: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            description_two: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            // Image fields
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "attachments",
                    key: "attachment_id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },

            attachment_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            is_published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: "Snapshot",
            tableName: "snapshot",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return Snapshot;
};