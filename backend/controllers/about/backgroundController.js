// controllers/backgroundController.js
"use strict";
const {
    Background,
    BackgroundAttachment,
    Attachment,
    sequelize,
} = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE BACKGROUND
// ===========================
const createBackground = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { title, description, icon, content, attachments } = req.body;

        if (!title || !content) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title and content are required.",
            });
        }

        const background = await Background.create(
            {
                background_id: uuidv4(),
                title,
                description,
                icon,
                content,
            },
            { transaction: t }
        );

        // Attachments
        if (Array.isArray(attachments) && attachments.length > 0) {
            const attachmentRows = attachments.map(({ attachment_id }) => ({
                background_attachment_id: uuidv4(),
                background_id: background.background_id,
                attachment_id,
                created_at: new Date(),
            }));

            await BackgroundAttachment.bulkCreate(attachmentRows, { transaction: t });
        }

        await t.commit();
        return res.status(201).json({
            success: true,
            message: "Background created successfully",
            data: background,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Background Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create background",
            error: error.message,
        });
    }
};

// ===========================
// GET ALL BACKGROUNDS
// ===========================
const getAllBackgrounds = async (req, res) => {
    try {
        const backgrounds = await Background.findAll({
            include: [
                {
                    model: BackgroundAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "Backgrounds fetched successfully",
            count: backgrounds.length,
            data: backgrounds,
        });
    } catch (error) {
        console.error("Fetch Backgrounds Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch backgrounds",
            error: error.message,
        });
    }
};

// ===========================
// GET BACKGROUND BY ID
// ===========================
const getBackgroundById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUuid(id)) {
            return res.status(400).json({ success: false, message: "Invalid background ID." });
        }

        const background = await Background.findByPk(id, {
            include: [
                {
                    model: BackgroundAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
            ],
        });

        if (!background) {
            return res.status(404).json({ success: false, message: "Background not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Background fetched successfully",
            data: background,
        });
    } catch (error) {
        console.error("Get Background Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch background",
            error: error.message,
        });
    }
};

// ===========================
// UPDATE BACKGROUND
// ===========================
const updateBackground = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, description, icon, content, attachment_ids } = req.body;

        const background = await Background.findByPk(id, { transaction: t });
        if (!background) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Background not found." });
        }

        await background.update({ title, description, icon, content }, { transaction: t });

        // Update attachments if provided
        if (Array.isArray(attachment_ids)) {
            await BackgroundAttachment.destroy({ where: { background_id: id }, transaction: t });

            const attachmentRows = attachment_ids.map((attachment_id) => ({
                background_attachment_id: uuidv4(),
                background_id: id,
                attachment_id,
                created_at: new Date(),
            }));

            await BackgroundAttachment.bulkCreate(attachmentRows, { transaction: t });
        }

        await t.commit();
        return res.status(200).json({
            success: true,
            message: "Background updated successfully",
            data: background,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Background Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update background",
            error: error.message,
        });
    }
};

// ===========================
// DELETE BACKGROUND (soft delete)
// ===========================
const deleteBackground = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const background = await Background.findByPk(id, { transaction: t });
        if (!background) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Background not found." });
        }

        await background.destroy({ transaction: t }); // or use paranoid soft delete
        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Background deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Background Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete background",
            error: error.message,
        });
    }
};

module.exports = {
    createBackground,
    getAllBackgrounds,
    getBackgroundById,
    updateBackground,
    deleteBackground,
};