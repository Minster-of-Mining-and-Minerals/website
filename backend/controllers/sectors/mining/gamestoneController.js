"use strict";

const {
    Gamestone,
    GamestoneAttachment,
    Attachment,
    sequelize,
} = require("../../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE GAMESTONE
=========================== */
const createGamestone = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            title,
            description,
            attachment_id,
            discovered_date,
            location,
            parent_id,
            attachments, // multiple attachments
        } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title is required.",
            });
        }

        const gamestone = await Gamestone.create(
            {
                gamestone_id: uuidv4(),
                title,
                description,
                location,
                attachment_id: attachment_id || null,
                discovered_date,
                parent_id: parent_id || null,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ===== MULTIPLE ATTACHMENTS ===== */
        if (Array.isArray(attachments) && attachments.length > 0) {
            const rows = attachments.map((att) => ({
                gamestone_attachment_id: uuidv4(),
                gamestone_id: gamestone.gamestone_id,
                attachment_id: att.attachment_id,
                created_at: new Date(),
            }));

            await GamestoneAttachment.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Gamestone created successfully",
            data: gamestone,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Gamestone Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create gamestone",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL GAMESTONES
=========================== */
const getAllGamestones = async (req, res) => {
    try {
        const { search, parent_id } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.like]: `%${search}%`,
            };
        }

        if (parent_id) {
            whereClause.parent_id = parent_id;
        }

        const gamestones = await Gamestone.findAll({
            where: whereClause,
            include: [
                {
                    model: Attachment,
                    as: "attachment",
                },
                {
                    model: GamestoneAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
                {
                    model: Gamestone,
                    as: "sub_items",
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "Gamestones fetched successfully",
            count: gamestones.length,
            data: gamestones,
        });
    } catch (error) {
        console.error("Fetch Gamestones Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch gamestones",
            error: error.message,
        });
    }
};

/* ===========================
   GET GAMESTONE BY ID
=========================== */
const getGamestoneById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gamestone ID.",
            });
        }

        const gamestone = await Gamestone.findByPk(id, {
            include: [
                {
                    model: Attachment,
                    as: "attachment",
                },
                {
                    model: GamestoneAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
                {
                    model: Gamestone,
                    as: "sub_items",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                        {
                            model: GamestoneAttachment,
                            as: "attachments",
                            include: [
                                {
                                    model: Attachment,
                                    as: "attachment",
                                },
                            ],
                        },
                    ],
                },
                {
                    model: Gamestone,
                    as: "parent",
                },
            ],
        });

        if (!gamestone) {
            return res.status(404).json({
                success: false,
                message: "Gamestone not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Gamestone fetched successfully",
            data: gamestone,
        });
    } catch (error) {
        console.error("Get Gamestone Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch gamestone",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE GAMESTONE
=========================== */
const updateGamestone = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;

        const gamestone = await Gamestone.findByPk(id, {
            transaction: t,
        });

        if (!gamestone) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Gamestone not found.",
            });
        }

        const {
            title,
            description,
            attachment_id,
            discovered_date,
            location,
            parent_id,
            attachments,
        } = req.body;

        await gamestone.update(
            {
                title,
                description,
                attachment_id,
                discovered_date,
                location,
                parent_id,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ===== UPDATE MULTIPLE ATTACHMENTS ===== */
        if (Array.isArray(attachments)) {
            await GamestoneAttachment.destroy({
                where: { gamestone_id: id },
                transaction: t,
            });

            const rows = attachments.map((att) => ({
                gamestone_attachment_id: uuidv4(),
                gamestone_id: id,
                attachment_id: att.attachment_id,
                created_at: new Date(),
            }));

            await GamestoneAttachment.bulkCreate(rows, {
                transaction: t,
            });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Gamestone updated successfully",
            data: gamestone,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Gamestone Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update gamestone",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE GAMESTONE (SOFT)
=========================== */
const deleteGamestone = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;

        const gamestone = await Gamestone.findByPk(id, {
            transaction: t,
        });

        if (!gamestone) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Gamestone not found.",
            });
        }

        await gamestone.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Gamestone deleted successfully (soft delete)",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Gamestone Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete gamestone",
            error: error.message,
        });
    }
};

module.exports = {
    createGamestone,
    getAllGamestones,
    getGamestoneById,
    updateGamestone,
    deleteGamestone,
};