// controllers/newsController.js
"use strict";
const {
    News,
    NewsAttachment,
    NewsMetadata,
    NewsReaction,
    NewsRead,
    NewsTag,
    Tag,
    Attachment,
    sequelize,
} = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

// ===========================
// CREATE NEWS
// ===========================
const createNews = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { description, attachment_ids, tag_ids } = req.body;

        if (!description) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Description is required.",
            });
        }

        const news = await News.create(
            {
                news_id: uuidv4(),
                description,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        // Link attachments if provided
        if (Array.isArray(attachment_ids) && attachment_ids.length > 0) {
            const attachments = attachment_ids.map(({ attachment_id, category }) => ({
                news_id: news.news_id,
                attachment_id,
                category: category || "body", // default category
            }));
            await NewsAttachment.bulkCreate(attachments, { transaction: t });
        }

        // Link tags if provided
        if (Array.isArray(tag_ids) && tag_ids.length > 0) {
            const tagLinks = tag_ids.map((tag_id) => ({
                news_id: news.news_id,
                tag_id,
            }));
            await NewsTag.bulkCreate(tagLinks, { transaction: t });
        }

        // Initialize metadata
        await NewsMetadata.create(
            {
                news_metadata_id: uuidv4(),
                news_id: news.news_id,
            },
            { transaction: t }
        );

        await t.commit();
        return res.status(201).json({
            success: true,
            message: "News created successfully",
            data: news,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create News Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create news",
            error: error.message,
        });
    }
};

// ===========================
// GET ALL NEWS
// ===========================
const getAllNews = async (req, res) => {
    try {
        const { search, tag } = req.query;

        const whereClause = {};
        if (search) {
            whereClause.description = { [Op.like]: `%${search}%` };
        }

        const includeClause = [
            {
                model: NewsAttachment,
                as: "attachments",
                include: [{ model: Attachment, as: "attachment" }],
            },
            { model: NewsMetadata, as: "metadata" },
            { model: NewsReaction, as: "reactions" },
            { model: NewsRead, as: "reads" },
            {
                model: NewsTag,
                as: "tag_links",
                include: [{ model: Tag, as: "tag" }],
            },
        ];

        if (tag) {
            includeClause.push({
                model: NewsTag,
                as: "tag_links",
                include: [
                    {
                        model: Tag,
                        as: "tag",
                        where: { name: tag },
                    },
                ],
            });
        }

        const newsList = await News.findAll({
            where: whereClause,
            include: includeClause,
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "News fetched successfully",
            count: newsList.length,
            data: newsList,
        });
    } catch (error) {
        console.error("Fetch News Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch news",
            error: error.message,
        });
    }
};

// ===========================
// GET NEWS BY ID
// ===========================
const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUuid(id)) {
            return res.status(400).json({ success: false, message: "Invalid news ID." });
        }

        const news = await News.findByPk(id, {
            include: [
                {
                    model: NewsAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
                { model: NewsMetadata, as: "metadata" },
                { model: NewsReaction, as: "reactions" },
                { model: NewsRead, as: "reads" },
                {
                    model: NewsTag,
                    as: "tag_links",
                    include: [{ model: Tag, as: "tag" }],
                },
            ],
        });

        if (!news) {
            return res.status(404).json({ success: false, message: "News not found." });
        }

        return res.status(200).json({
            success: true,
            message: "News fetched successfully",
            data: news,
        });
    } catch (error) {
        console.error("Get News Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch news",
            error: error.message,
        });
    }
};

// ===========================
// UPDATE NEWS
// ===========================
const updateNews = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { description, attachment_ids, tag_ids } = req.body;

        const news = await News.findByPk(id, { transaction: t });
        if (!news) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "News not found." });
        }

        await news.update({ description, updated_at: new Date() }, { transaction: t });

        // Update attachments if provided
        if (Array.isArray(attachment_ids)) {
            await NewsAttachment.destroy({ where: { news_id: id }, transaction: t });
            const attachments = attachment_ids.map(({ attachment_id, category }) => ({
                news_id: id,
                attachment_id,
                category: category || "body",
            }));
            await NewsAttachment.bulkCreate(attachments, { transaction: t });
        }

        // Update tags if provided
        if (Array.isArray(tag_ids)) {
            await NewsTag.destroy({ where: { news_id: id }, transaction: t });
            const tagLinks = tag_ids.map((tag_id) => ({ news_id: id, tag_id }));
            await NewsTag.bulkCreate(tagLinks, { transaction: t });
        }

        await t.commit();
        return res.status(200).json({
            success: true,
            message: "News updated successfully",
            data: news,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update News Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update news",
            error: error.message,
        });
    }
};

// ===========================
// DELETE NEWS (soft delete)
// ===========================
const deleteNews = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const news = await News.findByPk(id, { transaction: t });
        if (!news) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "News not found." });
        }

        await news.update({ deleted_at: new Date() }, { transaction: t });
        await t.commit();

        return res.status(200).json({
            success: true,
            message: "News deleted successfully (soft delete)",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete News Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete news",
            error: error.message,
        });
    }
};

// ===========================
// RECORD NEWS REACTION
// ===========================
const reactToNews = async (req, res) => {
    try {
        const { news_id, reaction } = req.body;
        const ip_address = req.ip;

        if (!["like", "dislike"].includes(reaction)) {
            return res.status(400).json({ success: false, message: "Invalid reaction type." });
        }

        const [newsReaction, created] = await NewsReaction.findOrCreate({
            where: { news_id, ip_address },
            defaults: { news_reaction_id: uuidv4(), reaction, created_at: new Date() },
        });

        if (!created) {
            newsReaction.reaction = reaction;
            await newsReaction.save();
        }

        return res.status(200).json({
            success: true,
            message: `News ${reaction}d successfully`,
            data: newsReaction,
        });
    } catch (error) {
        console.error("React News Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to react to news",
            error: error.message,
        });
    }
};

// ===========================
// RECORD NEWS READ
// ===========================
const recordNewsRead = async (req, res) => {
    try {
        const { news_id, read_time } = req.body; // read_time in seconds
        const ip_address = req.ip;

        const [newsRead, created] = await NewsRead.findOrCreate({
            where: { news_id, ip_address },
            defaults: { news_read_id: uuidv4(), total_read_time: read_time, last_read_at: new Date() },
        });

        if (!created) {
            newsRead.total_read_time += read_time;
            newsRead.last_read_at = new Date();
            await newsRead.save();
        }

        return res.status(200).json({
            success: true,
            message: "News read recorded successfully",
            data: newsRead,
        });
    } catch (error) {
        console.error("Record News Read Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to record news read",
            error: error.message,
        });
    }
};

module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews,
    reactToNews,
    recordNewsRead,
};
