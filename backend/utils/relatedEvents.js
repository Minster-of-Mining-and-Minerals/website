"use strict";

const { Op } = require("sequelize");
const {
    Event,
    EventCategory,
    EventAttachment,
    Attachment,
} = require("../models");

/**
 * Get related events for a given event item
 */
async function getRelatedEvents(eventId, limit = 10) {
    try {
        const now = new Date();

        /* ================= CURRENT EVENT ================= */
        const currentEvent = await Event.findByPk(eventId, {
            include: [
                {
                    model: EventCategory,
                    as: "category",
                },
            ],
        });

        if (!currentEvent) return [];

        const categoryId = currentEvent.event_category_id;

        const titleWords = currentEvent.title
            ?.toLowerCase()
            .split(/\s+/)
            .filter((w) => w.length > 3) || [];

        const contentText =
            currentEvent.content?.ops
                ?.map((op) => op.insert)
                .join(" ")
                .toLowerCase() || "";

        /* ================= FETCH CANDIDATES ================= */
        let otherEvents = await Event.findAll({
            where: {
                event_id: { [Op.ne]: eventId },
                status: "published", // ✅ ONLY PUBLISHED
                publish_start: { [Op.lte]: now }, // ✅ ALREADY PUBLISHED
                [Op.and]: [
                    {
                        [Op.or]: [
                            { publish_end: null },
                            { publish_end: { [Op.gte]: now } }
                        ]
                    }
                ],
                deleted_at: null,
            },
            include: [
                {
                    model: EventCategory,
                    as: "category",
                },
                {
                    model: EventAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
            ],
        });

        if (!otherEvents.length) return [];

        /* ================= SCORING ================= */
        const scoredEvents = otherEvents.map((e) => {
            let score = 0;

            /* 🔹 CATEGORY MATCH (STRONGEST SIGNAL) */
            if (categoryId && e.event_category_id === categoryId) {
                score += 15; // Strong weight for same category
            }

            /* 🔹 TITLE KEYWORD MATCH (HIGH PRIORITY) */
            const titleLower = e.title?.toLowerCase() || "";
            const contentLower =
                e.content?.ops?.map((op) => op.insert).join(" ").toLowerCase() || "";

            let keywordScore = 0;

            titleWords.forEach((word) => {
                if (titleLower.includes(word)) keywordScore += 3;
                else if (contentLower.includes(word)) keywordScore += 1;
            });

            score += keywordScore;

            /* 🔹 RECENCY (USE start_time or publish_start) */
            const publishedDate = new Date(e.publish_start || e.created_at);
            const daysDiff =
                (now - publishedDate) / (1000 * 60 * 60 * 24);

            score += Math.max(0, 6 - daysDiff * 0.15); // smoother decay

            return { event: e, score };
        });

        /* ================= SORT ================= */
        scoredEvents.sort((a, b) => b.score - a.score);

        let topEvents = scoredEvents.slice(0, limit).map((s) => s.event);

        /* ================= FALLBACK ================= */
        if (topEvents.length < limit) {
            const existingIds = topEvents.map((e) => e.event_id).concat(eventId);
            const remaining = limit - topEvents.length;

            const latestEvents = await Event.findAll({
                where: {
                    event_id: { [Op.notIn]: existingIds },
                    status: "published", // ✅ IMPORTANT
                    publish_start: { [Op.lte]: now },
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { publish_end: null },
                                { publish_end: { [Op.gte]: now } }
                            ]
                        }
                    ],
                    deleted_at: null,
                },
                order: [["publish_start", "DESC"]],
                limit: remaining,
                include: [
                    {
                        model: EventCategory,
                        as: "category",
                    },
                    {
                        model: EventAttachment,
                        as: "attachments",
                        include: [{ model: Attachment, as: "attachment" }],
                    },
                ],
            });

            topEvents = topEvents.concat(latestEvents);
        }

        return topEvents;
    } catch (error) {
        console.error("Related Events Error:", error);
        return [];
    }
}

module.exports = { getRelatedEvents };
