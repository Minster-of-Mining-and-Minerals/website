"use strict";

const { Card, Attachment, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ============================================
// CREATE CARD
// ============================================

const createCard = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            title,
            description,
            button_name,
            button_url,
            attachment_id,
        } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Card title is required",
            });
        }

        const card = await Card.create(
            {
                card_id: uuidv4(),
                title,
                description,
                button_name,
                button_url,
                attachment_id,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Card created successfully",
            data: card,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        console.error("Create Card Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create card",
            error: error.message,
        });
    }
};

// ============================================
// UPDATE CARD
// ============================================

const updateCard = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;

        const {
            title,
            description,
            button_name,
            button_url,
            attachment_id,
        } = req.body;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid card ID",
            });
        }

        const card = await Card.findOne({
            where: { card_id: id, deleted_at: null },
            transaction: t,
        });

        if (!card) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        await card.update(
            {
                title,
                description,
                button_name,
                button_url,
                attachment_id,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Card updated successfully",
            data: card,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        console.error("Update Card Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update card",
            error: error.message,
        });
    }
};

// ============================================
// GET ALL CARDS
// ============================================

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll({
            where: { deleted_at: null },
            include: [
                {
                    model: Attachment,
                    as: "attachment",
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            count: cards.length,
            data: cards,
        });
    } catch (error) {
        console.error("Fetch Cards Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch cards",
            error: error.message,
        });
    }
};

// ============================================
// GET CARD BY ID
// ============================================

const getCardById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid card ID",
            });
        }

        const card = await Card.findOne({
            where: { card_id: id, deleted_at: null },
            include: [
                {
                    model: Attachment,
                    as: "attachment",
                },
            ],
        });

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: card,
        });
    } catch (error) {
        console.error("Get Card Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch card",
            error: error.message,
        });
    }
};

// ============================================
// DELETE CARD (SOFT DELETE)
// ============================================

const deleteCard = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid card ID",
            });
        }

        const card = await Card.findOne({
            where: { card_id: id, deleted_at: null },
            transaction: t,
        });

        if (!card) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Card not found",
            });
        }

        // Soft delete
        await card.update(
            {
                deleted_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Card deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        console.error("Delete Card Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete card",
            error: error.message,
        });
    }
};

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    updateCard,
    deleteCard,
};