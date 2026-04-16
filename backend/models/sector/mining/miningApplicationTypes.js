"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class MiningApplicationTypes extends Model {
        static associate(models) {

            MiningApplicationTypes.belongsTo(models.MiningApplicationProcess, {
                foreignKey: "mining_application_process_id",
                as: "mining_application_process",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    MiningApplicationTypes.init(
        {
            mining_application_types_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            mining_application_process_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            requirements: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },
            steps: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },
            action_label: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            action_url: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            color: {
                type: DataTypes.TEXT,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningApplicationTypes",
            tableName: "mining_application_types",
            timestamps: true,   // ✅ REQUIRED for paranoid
            paranoid: true,
            underscored: true,
        }
    );

    return MiningApplicationTypes;
};