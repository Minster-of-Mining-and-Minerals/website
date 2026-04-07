// models/asm.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class InvestigationAction extends Model {
        static associate(models) {
            // define associations here if needed later
            InvestigationAction.belongsTo(models.InvestigateEthiopia, {
                foreignKey: "investigate_ethiopia_id",
                as: "investigate_ethiopia",
            });
        }
    }

    InvestigationAction.init(
        {
            investigation_action_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            investigate_ethiopia_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "investigate_ethiopia",
                    key: "investigate_ethiopia_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            action: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            link: {
                type: DataTypes.STRING,
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
            modelName: "InvestigationAction",
            tableName: "investigation_action",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return InvestigationAction;
};