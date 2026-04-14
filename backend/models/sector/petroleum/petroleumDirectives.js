// models/geothermal/geothermal-objective.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumDirective extends Model {
        static associate(models) {
            // belongs to PetroleumRegualtionProcess
            PetroleumDirective.belongsTo(models.PetroleumRegulationProcess, {
                foreignKey: "petroleum_regulation_process_id",
                as: "petroleum_regulation_process",
            });

        }
    }

    PetroleumDirective.init(
        {
            petroleum_directive_id: {
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

            type: {
                type: DataTypes.ENUM("main", "sub"),
                allowNull: false,
                defaultValue: "sub",
            },

            action_label: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            action: {
                type: DataTypes.TEXT,
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
            modelName: "PetroleumDirective",
            tableName: "petroleum_directive",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return PetroleumDirective;
};