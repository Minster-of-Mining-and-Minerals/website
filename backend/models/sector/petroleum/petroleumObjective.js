// models/geothermal/geothermal-objective.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PetroleumObjective extends Model {
        static associate(models) {
            // One objective can have many attachments
            PetroleumObjective.hasMany(models.PetroleumAttachment, {
                foreignKey: "petroleum_objective_id",
                as: "attachments",
            });
        }
    }

    PetroleumObjective.init(
        {
            petroleum_objective_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("headline", "others"),
                allowNull: false,
                defaultValue: "others",
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
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Array of objectives (list format)
            objectives: {
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
            modelName: "PetroleumObjective",
            tableName: "petroleum_objective",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return PetroleumObjective;
};