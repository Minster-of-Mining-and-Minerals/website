<<<<<<< HEAD
"use strict";

const { Op } = require("sequelize");
const {
    News,
    NewsTag,
    Tag,
    NewsMetadata,
    NewsAttachment,
    Attachment,
} = require("../models");

/**
 * Get related news for a given news item
 */
async function getRelatedNews(newsId, limit = 10) {
    try {
        const now = new Date();

        /* ================= CURRENT NEWS ================= */
        const currentNews = await News.findByPk(newsId, {
            include: [
                {
                    model: NewsTag,
                    as: "tag_links",
                },
            ],
        });

        if (!currentNews) return [];

        const tagIds = currentNews.tag_links.map((t) => t.tag_id);

        const titleWords = currentNews.title
            ?.toLowerCase()
            .split(/\s+/)
            .filter((w) => w.length > 3);

        const contentText =
            currentNews.content?.ops
                ?.map((op) => op.insert)
                .join(" ")
                .toLowerCase() || "";

        /* ================= FETCH CANDIDATES ================= */
        let otherNews = await News.findAll({
            where: {
                news_id: { [Op.ne]: newsId },
                status: "published", // ✅ ONLY PUBLISHED
                published_at: { [Op.lte]: now }, // ✅ NOT FUTURE
                deleted_at: null,
            },
            include: [
                {
                    model: NewsTag,
                    as: "tag_links",
                },
                { model: NewsMetadata, as: "metadata" },
                {
                    model: NewsAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
            ],
        });

        if (!otherNews.length) return [];

        /* ================= SCORING ================= */
        const scoredNews = otherNews.map((n) => {
            let score = 0;

            /* 🔹 TAG MATCH (STRONGEST SIGNAL) */
            const nTagIds = n.tag_links.map((t) => t.tag_id);
            const sharedTags = nTagIds.filter((id) => tagIds.includes(id));
            score += sharedTags.length * 8; // 🔥 increased weight

            /* 🔹 TITLE KEYWORD MATCH (HIGH PRIORITY) */
            const titleLower = n.title?.toLowerCase() || "";
            const contentLower =
                n.content?.ops?.map((op) => op.insert).join(" ").toLowerCase() || "";

            let keywordScore = 0;

            titleWords.forEach((word) => {
                if (titleLower.includes(word)) keywordScore += 3;
                else if (contentLower.includes(word)) keywordScore += 1;
            });

            score += keywordScore;

            /* 🔹 RECENCY (USE published_at) */
            const publishedDate = new Date(n.published_at || n.created_at);
            const daysDiff =
                (now - publishedDate) / (1000 * 60 * 60 * 24);

            score += Math.max(0, 6 - daysDiff * 0.15); // smoother decay

            /* 🔹 ENGAGEMENT BOOST */
            const likes = n.metadata?.like_count || 0;
            const reads = n.metadata?.read_count || 0;

            score += Math.log(1 + likes) * 2;
            score += Math.log(1 + reads) * 1.5;

            /* 🔹 PENALTY IF NO STRONG MATCH */
            if (sharedTags.length === 0 && keywordScore === 0) {
                score -= 5;
            }

            return { news: n, score };
        });

        /* ================= SORT ================= */
        scoredNews.sort((a, b) => b.score - a.score);

        let topNews = scoredNews.slice(0, limit).map((s) => s.news);

        /* ================= FALLBACK ================= */
        if (topNews.length < limit) {
            const existingIds = topNews.map((n) => n.news_id).concat(newsId);
            const remaining = limit - topNews.length;

            const latestNews = await News.findAll({
                where: {
                    news_id: { [Op.notIn]: existingIds },
                    status: "published", // ✅ IMPORTANT
                    published_at: { [Op.lte]: now },
                    deleted_at: null,
                },
                order: [["published_at", "DESC"]],
                limit: remaining,
            });

            topNews = topNews.concat(latestNews);
        }

        return topNews;
    } catch (error) {
        console.error("Related News Error:", error);
        return [];
    }
=======
// utils/relatedNews.js
const { Op, Sequelize } = require("sequelize");
const { News, NewsTag, Tag, NewsMetadata, NewsAttachment, Attachment } = require("../models");

/**
 * Get related news for a given news item
 * @param {string} newsId
 * @param {number} limit default 10
 */
async function getRelatedNews(newsId, limit = 10) {
    // 1️⃣ Fetch the current news with tags
    const currentNews = await News.findByPk(newsId, {
        include: [
            {
                model: NewsTag,
                as: "tag_links",
                include: [{ model: Tag, as: "tag" }],
            },
        ],
    });

    if (!currentNews) return [];

    const tagIds = currentNews.tag_links.map((t) => t.tag_id);
    const titleWords = currentNews.title
        .split(/\s+/)
        .filter((w) => w.length > 3) // skip very short words
        .map((w) => w.toLowerCase());

    const contentText = currentNews.content?.ops
        ?.map((op) => op.insert)
        .join(" ")
        .toLowerCase() || "";

    // 2️⃣ Get all other news (exclude current)
    let otherNews = await News.findAll({
        where: { news_id: { [Op.ne]: newsId } },
        include: [
            {
                model: NewsTag,
                as: "tag_links",
                include: [{ model: Tag, as: "tag" }],
            },
            { model: NewsMetadata, as: "metadata" },
            { model: NewsAttachment, as: "attachments", include: [{ model: Attachment, as: "attachment" }], },
        ],
    });

    if (!otherNews || otherNews.length === 0) return [];

    // 3️⃣ Score news by relevance
    const scoredNews = otherNews.map((n) => {
        let score = 0;

        // Tag match
        const nTagIds = n.tag_links.map((t) => t.tag_id);
        const sharedTags = nTagIds.filter((id) => tagIds.includes(id));
        score += sharedTags.length * 5; // tags are most important

        // Title/content match
        const titleLower = n.title.toLowerCase();
        const contentLower = n.content?.ops?.map((op) => op.insert).join(" ").toLowerCase() || "";
        const keywordMatches = titleWords.filter((w) => titleLower.includes(w) || contentLower.includes(w));
        score += keywordMatches.length * 2;

        // Recentness bonus (more recent = higher score)
        const daysDiff = Math.abs(new Date() - new Date(n.created_at)) / (1000 * 60 * 60 * 24); // days difference
        score += Math.max(0, 5 - daysDiff * 0.1); // small bonus, decreases over time

        return { news: n, score };
    });

    // 4️⃣ Sort by score descending
    scoredNews.sort((a, b) => b.score - a.score);

    // 5️⃣ Take top `limit`
    let topNews = scoredNews.slice(0, limit).map((s) => s.news);

    // 6️⃣ Fallback: if not enough news, fill with latest
    if (topNews.length < limit) {
        const existingIds = topNews.map((n) => n.news_id).concat(newsId);
        const remaining = limit - topNews.length;
        const latestNews = await News.findAll({
            where: { news_id: { [Op.notIn]: existingIds } },
            order: [["created_at", "DESC"]],
            limit: remaining,
        });
        topNews = topNews.concat(latestNews);
    }

    return topNews;
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
}

module.exports = { getRelatedNews };