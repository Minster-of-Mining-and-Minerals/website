// models/geothermal/geothermal-objective.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumRegulation extends Model {
        static associate(models) {
            // belongs to PetroleumRegulationProcess
            PetroleumRegulation.belongsTo(models.PetroleumRegulationProcess, {
                foreignKey: "petroleum_regulation_process_id",
                as: "petroleum_regulation_process",
            });

        }
    }

    PetroleumRegulation.init(
        {
            petroleum_regulation_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            petroleum_regulation_process_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            order: {
                type: DataTypes.INTEGER,
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

            content: {
                type: DataTypes.JSON, // works across most DBs
                allowNull: false,
                defaultValue: [],
            },

            // Array of objectives (list format)
            objectives: {
                type: DataTypes.JSON, // works across most DBs
                allowNull: false,
                defaultValue: [],
            },
            bullet_points: {
                type: DataTypes.JSON, // works across most DBs
                allowNull: false,
                defaultValue: [],
            },
            steps: {
                type: DataTypes.JSON, // works across most DBs
                allowNull: false,
                defaultValue: [],
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
            modelName: "PetroleumRegulation",
            tableName: "petroleum_regulation",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return PetroleumRegulation;
};