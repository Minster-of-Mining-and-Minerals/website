"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MiningGuidelineContent extends Model {
        static associate(models) {
            MiningGuidelineContent.belongsTo(models.MiningGuideline, {
                foreignKey: "mining_guideline_id",
                as: "mining_guideline",
            });
        }
    }

    MiningGuidelineContent.init(
        {
            mining_guideline_content_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            mining_guideline_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "mining_guideline",
                    key: "mining_guideline_id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },
            type: {
                type: DataTypes.ENUM("card", "bullet", "others"),
                allowNull: false,
                defaultValue: "others",
            },
            bg_color: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            stamp: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            deleted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "MiningGuidelineContent",
            tableName: "mining_guideline_content",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    return MiningGuidelineContent;
};