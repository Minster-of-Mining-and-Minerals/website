// models/geothermal/geothermal-objective.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumRegulationProcess extends Model {
        static associate(models) {

            PetroleumRegulationProcess.hasMany(models.PetroleumRegulation, {
                foreignKey: "petroleum_regulation_process_id",
                as: "regulations",
            });
            // One objective can have many attachments
            PetroleumRegulationProcess.hasMany(models.PetroleumRegulationAttachment, {
                foreignKey: "petroleum_regulation_process_id",
                as: "attachments",
            });
            PetroleumRegulationProcess.hasMany(models.PetroleumDirective, {
                foreignKey: "petroleum_regulation_process_id",
                as: "directives",
            });
        }
    }

    PetroleumRegulationProcess.init(
        {
            petroleum_regulation_process_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: "PetroleumRegulationProcess",
            tableName: "petroleum_regulation_process",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return PetroleumRegulationProcess;
};