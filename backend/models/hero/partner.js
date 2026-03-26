"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Partner extends Model {
        static associate(models) {
            Partner.hasMany(models.PartnerAttachment, {
                foreignKey: "partner_id",
                as: "attachments",
            });
        }
    }

    Partner.init(
        {
            partner_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

            // Optional soft delete (recommended)
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Partner",
            tableName: "partners",
            timestamps: false,
            underscored: true,
        }
    );

    return Partner;
};