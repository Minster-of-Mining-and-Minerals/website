// models/routeTranslation.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class RouteTranslation extends Model {
        static associate(models) {
            RouteTranslation.belongsTo(models.Route, {
                foreignKey: "route_id",
                as: "route",
            });
        }
    }

    RouteTranslation.init(
        {
            route_translation_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            route_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            language_code: {
                type: DataTypes.STRING(10), // e.g. "en", "am", "fr"
                allowNull: false,
            },

            label: {
                type: DataTypes.STRING(255),
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
            modelName: "RouteTranslation",
            tableName: "route_translations",
            timestamps: false,
            underscored: true,
        }
    );

    return RouteTranslation;
};