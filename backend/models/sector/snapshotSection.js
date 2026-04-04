"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class SnapshotSection extends Model {
        static associate(models) {
            SnapshotSection.belongsTo(models.Snapshot, {
                foreignKey: "snapshot_id",
                as: "snapshot",
            });
        }
    }

    SnapshotSection.init(
        {
            section_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            snapshot_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            // Example: "Mandate", "Strategic Focus"
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            // Example: the description text
            content: {
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
        },
        {
            sequelize,
            modelName: "SnapshotSection",
            tableName: "snapshot_section",
            timestamps: false,
            underscored: true,
        }
    );

    return SnapshotSection;
};