"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("news_reactions", {
      news_reaction_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      news_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "news", key: "news_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ip_address: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      reaction: {
        type: Sequelize.ENUM("like", "dislike"),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("news_reactions", ["news_id", "ip_address"], { unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("news_reactions");
  },
};
