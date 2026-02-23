// models/news/service.js
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        static associate(models) {
            // define associations here if needed later
        }
    }

    Service.init(
        {
            service_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            icon: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            content: {
                type: DataTypes.STRING(555),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Service",
            tableName: "services",
            timestamps: false,
            underscored: true,
        }
    );

    return Service;
};