"use strict";

const {
    MiningApplicationProcess,
    MiningApplicationProcessAttachment,
    MiningApplicationTypes,
    Attachment,
    sequelize,
} = require("../../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE PROCESS
=========================== */
const createMiningApplicationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            title,
            description,
            objectives,
            attachments,
            application_types,
            publish,
        } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        /* ========= CREATE PROCESS ========= */
        const process = await MiningApplicationProcess.create(
            {
                mining_application_process_id: uuidv4(),
                title,
                description,
                objectives,
                publish: publish !== undefined ? publish : false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= ATTACHMENTS ========= */
        if (Array.isArray(attachments)) {
            const rows = attachments.map((a) => ({
                mining_application_process_attachment_id: uuidv4(),
                mining_application_process_id: process.mining_application_process_id,
                attachment_id: a.attachment_id,
                overlay_text: a.overlay_text,
                overlay_icon: a.overlay_icon,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await MiningApplicationProcessAttachment.bulkCreate(rows, { transaction: t });
        }

        /* ========= APPLICATION TYPES ========= */
        if (Array.isArray(application_types)) {
            const rows = application_types.map((type) => ({
                mining_application_types_id: uuidv4(),
                mining_application_process_id: process.mining_application_process_id,
                icon: type.icon,
                title: type.title,
                requirements: type.requirements || [],
                steps: type.steps || [],
                action_label: type.action_label,
                action_url: type.action_url,
                color: type.color,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await MiningApplicationTypes.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Mining application process created successfully",
            data: process,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to create process",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL
=========================== */
const getAllMiningApplicationProcesses = async (req, res) => {
    try {
        const { search, published } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        // Filter by publish status if provided
        if (published !== undefined) {
            whereClause.publish = published === 'true';
        }

        const data = await MiningApplicationProcess.findAll({
            where: whereClause,
            include: [
                {
                    model: MiningApplicationProcessAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
                {
                    model: MiningApplicationTypes,
                    as: "application_types",
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch processes",
            error: error.message,
        });
    }
};

/* ===========================
   GET BY ID
=========================== */
const getMiningApplicationProcessById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const process = await MiningApplicationProcess.findByPk(id, {
            include: [
                {
                    model: MiningApplicationProcessAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
                {
                    model: MiningApplicationTypes,
                    as: "application_types",
                },
            ],
        });

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: process,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch process",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE
=========================== */
const updateMiningApplicationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const {
            title,
            description,
            objectives,
            attachments,
            application_types,
            publish,
        } = req.body;

        const process = await MiningApplicationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        await process.update(
            {
                title,
                description,
                objectives,
                publish: publish !== undefined ? publish : process.publish,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= RESET ATTACHMENTS ========= */
        await MiningApplicationProcessAttachment.destroy({
            where: { mining_application_process_id: id },
            transaction: t,
        });

        /* ========= RESET TYPES ========= */
        await MiningApplicationTypes.destroy({
            where: { mining_application_process_id: id },
            transaction: t,
        });

        /* ========= RECREATE ATTACHMENTS ========= */
        if (Array.isArray(attachments)) {
            const rows = attachments.map((a) => ({
                mining_application_process_attachment_id: uuidv4(),
                mining_application_process_id: id,
                attachment_id: a.attachment_id,
                overlay_text: a.overlay_text,
                overlay_icon: a.overlay_icon,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await MiningApplicationProcessAttachment.bulkCreate(rows, { transaction: t });
        }

        /* ========= RECREATE TYPES ========= */
        if (Array.isArray(application_types)) {
            const rows = application_types.map((type) => ({
                mining_application_types_id: uuidv4(),
                mining_application_process_id: id,
                icon: type.icon,
                title: type.title,
                requirements: type.requirements || [],
                steps: type.steps || [],
                action_label: type.action_label,
                action_url: type.action_url,
                color: type.color,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await MiningApplicationTypes.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Process updated successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to update process",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE (SOFT)
=========================== */
const deleteMiningApplicationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const process = await MiningApplicationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        await process.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Process deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to delete process",
            error: error.message,
        });
    }
};

/* ===========================
   TOGGLE PUBLISH STATUS
=========================== */
const togglePublishStatus = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { publish } = req.body;

        if (publish === undefined) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Publish status is required",
            });
        }

        const process = await MiningApplicationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        // ✅ If publishing one → unpublish all others
        if (publish === true) {
            await MiningApplicationProcess.update(
                { publish: false },
                {
                    where: {
                        mining_application_process_id: {
                            [Op.ne]: id,
                        },
                    },
                    transaction: t,
                }
            );
        }

        // ✅ Update selected process
        await process.update(
            { publish, updated_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: `Process ${publish ? 'published' : 'unpublished'} successfully`,
            data: { publish: process.publish },
        });

    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to toggle publish status",
            error: error.message,
        });
    }
};

module.exports = {
    createMiningApplicationProcess,
    getAllMiningApplicationProcesses,
    getMiningApplicationProcessById,
    updateMiningApplicationProcess,
    deleteMiningApplicationProcess,
    togglePublishStatus,
};