"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class PartnerAttachment extends Model {
        static associate(models) {
            // Belongs to Partner
            PartnerAttachment.belongsTo(models.Partner, {
                foreignKey: "partner_id",
                as: "partner",
            });

            // Belongs to Attachment
            PartnerAttachment.belongsTo(models.Attachment, {
                foreignKey: "attachment_id",
                as: "attachment",
            });
        }
    }

    PartnerAttachment.init(
        {
            category: {
                type: DataTypes.ENUM("logo", "gallery", "document"),
                allowNull: false,
                defaultValue: "logo",
            },

            partner_attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            partner_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            attachment_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "PartnerAttachment",
            tableName: "partner_attachments",
            timestamps: false,
            underscored: true,
        }
    );

    return PartnerAttachment;
};