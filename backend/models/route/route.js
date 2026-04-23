// models/route.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Route extends Model {
        static associate(models) {
            // hierarchy
            Route.hasMany(models.Route, {
                foreignKey: "parent_id",
                as: "children",
            });

            Route.belongsTo(models.Route, {
                foreignKey: "parent_id",
                as: "parent",
            });

            // translations
            Route.hasMany(models.RouteTranslation, {
                foreignKey: "route_id",
                as: "translations",
            });
        }
    }

    Route.init(
        {
            route_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            path: {
                type: DataTypes.STRING(255),
                allowNull: true, // null for parent groups
            },

            parent_id: {
                type: DataTypes.UUID,
                allowNull: true,
            },

            order: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },

            show_in_navbar: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
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
            modelName: "Route",
            tableName: "routes",
            timestamps: false,
            underscored: true,
        }
    );

    return Route;
};