"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningServiceCard extends Model {
        static associate(models) {

            MiningServiceCard.belongsTo(models.MiningService, {
                foreignKey: "mining_service_id",
                as: "mining_service",
            });
        }
    }

    MiningServiceCard.init(
        {
            mining_service_card_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            mining_service_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "mining_service",
                    key: "mining_service_id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            sub_title: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            sub_title_color: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: "#f8f521ff",
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            requirements: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningServiceCard",
            tableName: "mining_service_card",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return MiningServiceCard;
};