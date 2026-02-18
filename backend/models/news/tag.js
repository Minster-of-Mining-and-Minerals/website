// models/news/tag.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            Tag.hasMany(models.NewsTag, {
                foreignKey: "tag_id",
                as: "news_links",
            });
        }
    }

    Tag.init(
        {
            tag_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            slug: {
                type: DataTypes.STRING(120),
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Tag",
            tableName: "tags",
            timestamps: false,
            underscored: true,
        }
    );

    return Tag;
};
