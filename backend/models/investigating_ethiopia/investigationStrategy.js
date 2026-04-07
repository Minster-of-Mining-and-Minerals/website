"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class InvestigationStrategy extends Model {
        static associate(models) {
            // define associations here later if needed
            InvestigationStrategy.belongsTo(models.InvestigateEthiopia, {
                foreignKey: "investigate_ethiopia_id",
                as: "investigate_ethiopia",
            });
            InvestigationStrategy.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    InvestigationStrategy.init(
        {
            investigation_strategy_id: {
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
            type: {
                type: DataTypes.ENUM("headlines", "strategic_minerals", "autonomy", "autonomous_institutions", "strategic_pillars", "ambition", "global_proclamation"),
                allowNull: false,
                defaultValue: "headlines",
            },
            icon: {
                type: DataTypes.STRING,
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
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            attachment_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "attachments",
                    key: "attachment_id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            link: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            bg_color: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "#0b102dff",
            },
            fg_color: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "#FFFFFF",
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
            modelName: "InvestigationStrategy",
            tableName: "investigation_strategy",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return InvestigationStrategy;
};