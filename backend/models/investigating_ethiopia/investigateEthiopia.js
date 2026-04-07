// models/asm.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class InvestigateEthiopia extends Model {
        static associate(models) {
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "headlines",
            });
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "strategic_minerals",
            });
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "autonomy",
            });
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "autonomous_institutions",
            });
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "strategic_pillars",
            });
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "ambition",
            });
            InvestigateEthiopia.hasMany(models.InvestigationStrategy, {
                foreignKey: "investigate_ethiopia_id",
                as: "global_proclamation",
            });
            InvestigateEthiopia.hasMany(models.InvestigationAction, {
                foreignKey: "investigate_ethiopia_id",
                as: "investigation_action",
            });

        }
    }

    InvestigateEthiopia.init(
        {
            investigate_ethiopia_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
            modelName: "InvestigateEthiopia",
            tableName: "investigate_ethiopia",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return InvestigateEthiopia;
};