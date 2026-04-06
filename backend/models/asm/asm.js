// models/asm.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ASM extends Model {
        static associate(models) {
            // define associations here if needed later
            ASM.hasMany(models.ASMAttachment, {
                foreignKey: "asm_id",
                as: "attachments",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "headlines",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "strategic_objective",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "economic_impact",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "impact_contribution",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "strategic_pillars",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "key_initiatives",
            });
            ASM.hasMany(models.Objective, {
                foreignKey: "asm_id",
                as: "objectives",
            });

            ASM.hasMany(models.ASMPreview, {
                foreignKey: "asm_id",
                as: "previews",
            });
        }
    }

    ASM.init(
        {
            asm_id: {
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
            modelName: "ASM",
            tableName: "asm",
            timestamps: false,
            underscored: true,
            paranoid: true,
        }
    );

    return ASM;
};