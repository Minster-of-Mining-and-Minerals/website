// controllers/tagController.js
"use strict";

const { Tag, NewsTag, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE TAG
// ===========================
const createTag = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { name } = req.body;

        if (!name) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "name is required.",
            });
        }

        // Check if tag already exists
        const existingTag = await Tag.findOne({ where: { name } });
        if (existingTag) {
            await t.rollback();
            return res.status(409).json({
                success: false,
                message: "Tag already exists.",
            });
        }

        const tag = await Tag.create(
            {
                tag_id: uuidv4(),
                name,
                created_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();
        return res.status(201).json({
            success: true,
            message: "Tag created successfully.",
            data: tag,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Tag Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create tag",
            error: error.message,
        });
    }
};

// ===========================
// GET ALL TAGS
// ===========================
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [
                {
                    model: NewsTag,
                    as: "news_links",
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "Tags fetched successfully",
            count: tags.length,
            data: tags,
        });
    } catch (error) {
        console.error("Get Tags Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tags",
            error: error.message,
        });
    }
};

// ===========================
// GET TAG BY ID
// ===========================
const getTagById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({ success: false, message: "Invalid tag ID." });
        }

        const tag = await Tag.findByPk(id, {
            include: [
                {
                    model: NewsTag,
                    as: "news_links",
                },
            ],
        });

        if (!tag) {
            return res.status(404).json({ success: false, message: "Tag not found." });
        }

        return res.status(200).json({
            success: true,
            message: "Tag fetched successfully",
            data: tag,
        });
    } catch (error) {
        console.error("Get Tag Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tag",
            error: error.message,
        });
    }
};

// ===========================
// UPDATE TAG
// ===========================
const updateTag = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({ success: false, message: "Invalid tag ID." });
        }

        const tag = await Tag.findByPk(id, { transaction: t });
        if (!tag) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Tag not found." });
        }

        await tag.update(
            { name: name || tag.name },
            { transaction: t }
        );

        await t.commit();
        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data: tag,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Tag Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update tag",
            error: error.message,
        });
    }
};

// ===========================
// DELETE TAG (soft delete)
// ===========================
const deleteTag = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({ success: false, message: "Invalid tag ID." });
        }

        const tag = await Tag.findByPk(id, { transaction: t });
        if (!tag) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Tag not found." });
        }

        // Optional: unlink related news tags
        await NewsTag.destroy({ where: { tag_id: id }, transaction: t });

        await tag.destroy({ transaction: t }); // permanent delete
        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Tag Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete tag",
            error: error.message,
        });
    }
};

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
};
