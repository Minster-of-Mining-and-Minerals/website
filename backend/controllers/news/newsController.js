// controllers/newsController.js
"use strict";
const {
    News,
    NewsAttachment,
    NewsMetadata,
    NewsReaction,
    NewsFeedback,
    NewsRead,
    NewsTag,
    Tag,
    Attachment,
    sequelize,
} = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");
const { getRelatedNews } = require("../../utils/relatedNews");

// ===========================
// CREATE NEWS
// ===========================
const createNews = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { title, author, content, attachments, tags } = req.body;

        if (!content) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Content is required.",
            });
        }

        const news = await News.create(
            {
                news_id: uuidv4(),
                title,
                author,
                content,
                status: req.body.status || "draft",
                published_at: req.body.published_at || (req.body.status === "published" ? new Date() : null),
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ================= ATTACHMENTS ================= */
        if (Array.isArray(attachments) && attachments.length > 0) {
            const attachmentRows = attachments.map(({ attachment_id, category }) => ({
                news_attachment_id: uuidv4(),
                news_id: news.news_id,
                attachment_id,
                category: category || "body",
                created_at: new Date(),
            }));

            await NewsAttachment.bulkCreate(attachmentRows, { transaction: t });
        }

        /* ================= TAGS ================= */
        if (Array.isArray(tags) && tags.length > 0) {
            const tagLinks = tags.map((tag_id) => ({
                news_id: news.news_id,
                tag_id,
            }));

            await NewsTag.bulkCreate(tagLinks, { transaction: t });
        }

        /* ================= METADATA ================= */
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

/* ===========================
// GET ALL NEWS
// =========================== */
const getAllNews = async (req, res) => {
    try {
        const { search, tag, status, isAdmin } = req.query;

        const whereClause = { deleted_at: null };
        if (search) {
            whereClause.title = { [Op.like]: `%${search}%` };
        }

        // Status Filtering Logic
        if (isAdmin === "true") {
            if (status) {
                whereClause.status = status;
            }
            // If no status is provided, admin sees everything (draft, published, archived)
        } else {
            // Public Side: Only Published and not scheduled for future
            whereClause.status = "published";
            whereClause.published_at = {
                [Op.lte]: new Date(),
            };
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

        const relatedNews = await getRelatedNews(id, 10);

        return res.status(200).json({
            success: true,
            message: "News fetched successfully",
            data: { ...news.toJSON(), relatedNews },
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
        const { title, author, content, attachment_ids, tag_ids } = req.body;

        const news = await News.findByPk(id, { transaction: t });
        if (!news) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "News not found." });
        }

        const newsData = { title, author, content, updated_at: new Date() };

        if (req.body.status) {
            newsData.status = req.body.status;
            // If transitioning to published and published_at is not set, set it to now
            if (req.body.status === "published" && !news.published_at && !req.body.published_at) {
                newsData.published_at = new Date();
            }
        }

        if (req.body.published_at !== undefined) {
            newsData.published_at = req.body.published_at;
        }

        await news.update(newsData, { transaction: t });

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
    const transaction = await sequelize.transaction();

    try {
        const { news_id, reaction } = req.body;
        const ip_address = req.ip;

        if (!["like", "dislike"].includes(reaction)) {
            await transaction.rollback();
            return res.status(400).json({ success: false, message: "Invalid reaction type." });
        }

        // Find existing reaction for this IP
        const existingReaction = await NewsReaction.findOne({
            where: { news_id, ip_address },
            transaction
        });

        let previousReaction = null;

        if (existingReaction) {
            previousReaction = existingReaction.reaction;

            if (existingReaction.reaction === reaction) {
                // User is removing their reaction (clicking same button)
                await existingReaction.destroy({ transaction });

                // Update metadata counts
                if (reaction === 'like') {
                    await NewsMetadata.decrement('like_count', {
                        where: { news_id },
                        transaction
                    });
                } else {
                    await NewsMetadata.decrement('dislike_count', {
                        where: { news_id },
                        transaction
                    });
                }

                await transaction.commit();
                return res.status(200).json({
                    success: true,
                    message: `News ${reaction} removed successfully`,
                    data: null,
                });
            } else {
                // User is switching from like to dislike or vice versa
                await existingReaction.update({ reaction }, { transaction });

                // Update metadata counts for the switch
                if (reaction === 'like') {
                    // Switching from dislike to like
                    await NewsMetadata.increment('like_count', { where: { news_id }, transaction });
                    await NewsMetadata.decrement('dislike_count', { where: { news_id }, transaction });
                } else {
                    // Switching from like to dislike
                    await NewsMetadata.increment('dislike_count', { where: { news_id }, transaction });
                    await NewsMetadata.decrement('like_count', { where: { news_id }, transaction });
                }
            }
        } else {
            // New reaction
            await NewsReaction.create({
                news_reaction_id: uuidv4(),
                news_id,
                ip_address,
                reaction,
                created_at: new Date()
            }, { transaction });

            // Update metadata counts for new reaction
            if (reaction === 'like') {
                await NewsMetadata.increment('like_count', { where: { news_id }, transaction });
            } else {
                await NewsMetadata.increment('dislike_count', { where: { news_id }, transaction });
            }
        }

        await transaction.commit();

        // Fetch updated metadata to return
        const updatedMetadata = await NewsMetadata.findOne({
            where: { news_id },
            attributes: ['like_count', 'dislike_count']
        });

        return res.status(200).json({
            success: true,
            message: `News ${reaction}d successfully`,
            data: {
                reaction: existingReaction || await NewsReaction.findOne({ where: { news_id, ip_address } }),
                metadata: updatedMetadata
            },
        });
    } catch (error) {
        await transaction.rollback();
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

// ===========================
// RECORD NEWS FEEDBACK
// ===========================
const recordNewsFeedback = async (req, res) => {
    try {
        const { news_id, fullname, thought } = req.body;

        const news = await News.findByPk(news_id);
        if (!news) {
            return res.status(404).json({ success: false, message: "News not found." });
        }

        const newsFeedback = await NewsFeedback.create({ news_id, fullname, thought });

        return res.status(200).json({
            success: true,
            message: "News feedback recorded successfully",
            data: newsFeedback,
        });
    } catch (error) {
        console.error("Record News Feedback Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to record news feedback",
            error: error.message,
        });
    }
};

// ===========================
// GET NEWS FEEDBACKS
// ===========================
const getNewsFeedbacks = async (req, res) => {
    try {
        const { news_id } = req.params;

        const newsFeedbacks = await NewsFeedback.findAll({ where: { news_id } });

        return res.status(200).json({
            success: true,
            message: "News feedbacks fetched successfully",
            data: newsFeedbacks,
        });
    } catch (error) {
        console.error("Get News Feedbacks Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get news feedbacks",
            error: error.message,
        });
    }
};

// ===========================
// GET NEWS FEEDBACK COUNT
// ===========================
const getNewsFeedbackCount = async (req, res) => {
    try {
        const { news_id } = req.params;

        // Check if news exists
        const news = await News.findByPk(news_id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: "News not found.",
            });
        }

        // Count feedback
        const feedbackCount = await NewsFeedback.count({
            where: { news_id },
        });

        return res.status(200).json({
            success: true,
            message: "News feedback count fetched successfully",
            data: {
                news_id,
                feedback_count: feedbackCount,
            },
        });
    } catch (error) {
        console.error("Get News Feedback Count Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch feedback count",
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
    recordNewsFeedback,
    getNewsFeedbacks,
    getNewsFeedbackCount,
};
