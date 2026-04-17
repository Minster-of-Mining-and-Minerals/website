"use strict";

const {
    MiningRegulationProcess,
    MiningFramework,
    MiningGuideline,
    MiningGuidelineContent,
    MiningGuidelineAttachment,
    MiningService,
    MiningServiceCard,
    Attachment,
    sequelize,
} = require("../../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE REGULATION PROCESS
=========================== */
const createMiningRegulationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            title,
            description,
            publish,
            frameworks,
            guidelines,
            services,
        } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        /* ========= CREATE PROCESS ========= */
        const process = await MiningRegulationProcess.create(
            {
                mining_regulation_process_id: uuidv4(),
                title,
                description,
                publish: publish !== undefined ? publish : false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= FRAMEWORKS ========= */
        if (Array.isArray(frameworks)) {
            const frameworkRows = frameworks.map((fw) => ({
                mining_framework_id: uuidv4(),
                mining_regulation_process_id: process.mining_regulation_process_id,
                title: fw.title,
                description: fw.description,
                objectives: fw.objectives || [],
                attachment_id: fw.attachment_id || null,
                attachment_overlay_text: fw.attachment_overlay_text || "Mining Framework",
                attachment_overlay_color: fw.attachment_overlay_color || "#ffffff",
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await MiningFramework.bulkCreate(frameworkRows, { transaction: t });
        }

        /* ========= GUIDELINES ========= */
        if (Array.isArray(guidelines)) {
            for (const guideline of guidelines) {
                const newGuideline = await MiningGuideline.create(
                    {
                        mining_guideline_id: uuidv4(),
                        mining_regulation_process_id: process.mining_regulation_process_id,
                        icon: guideline.icon || null,
                        title: guideline.title,
                        description: guideline.description || null,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                /* ========= GUIDELINE CONTENTS ========= */
                if (Array.isArray(guideline.contents)) {
                    const contentRows = guideline.contents.map((content) => ({
                        mining_guideline_content_id: uuidv4(),
                        mining_guideline_id: newGuideline.mining_guideline_id,
                        type: content.type || "others",
                        bg_color: content.bg_color || null,
                        icon: content.icon || null,
                        stamp: content.stamp || null,
                        title: content.title,
                        description: content.description || null,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await MiningGuidelineContent.bulkCreate(contentRows, { transaction: t });
                }

                /* ========= GUIDELINE ATTACHMENTS ========= */
                if (Array.isArray(guideline.attachments)) {
                    const attachmentRows = guideline.attachments.map((att) => ({
                        mining_guideline_attachment_id: uuidv4(),
                        mining_guideline_id: newGuideline.mining_guideline_id,
                        attachment_id: att.attachment_id,
                        label: att.label,
                        created_at: new Date(),
                    }));

                    await MiningGuidelineAttachment.bulkCreate(attachmentRows, { transaction: t });
                }
            }
        }

        /* ========= SERVICES ========= */
        if (Array.isArray(services)) {
            for (const service of services) {
                const newService = await MiningService.create(
                    {
                        mining_service_id: uuidv4(),
                        mining_regulation_process_id: process.mining_regulation_process_id,
                        title: service.title,
                        description: service.description || null,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                /* ========= SERVICE CARDS ========= */
                if (Array.isArray(service.service_cards)) {
                    const cardRows = service.service_cards.map((card) => ({
                        mining_service_card_id: uuidv4(),
                        mining_service_id: newService.mining_service_id,
                        title: card.title,
                        sub_title: card.sub_title || null,
                        sub_title_color: card.sub_title_color || "#f8f521ff",
                        icon: card.icon || null,
                        description: card.description,
                        requirements: card.requirements || [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await MiningServiceCard.bulkCreate(cardRows, { transaction: t });
                }
            }
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Mining regulation process created successfully",
            data: process,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to create regulation process",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL REGULATION PROCESSES
=========================== */
const getAllMiningRegulationProcesses = async (req, res) => {
    try {
        const { search, published } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        if (published !== undefined) {
            whereClause.publish = published === 'true';
        }

        const data = await MiningRegulationProcess.findAll({
            where: whereClause,
            include: [
                {
                    model: MiningFramework,
                    as: "frameworks",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
                {
                    model: MiningGuideline,
                    as: "guidelines",
                    include: [
                        {
                            model: MiningGuidelineContent,
                            as: "contents",
                        },
                        {
                            model: MiningGuidelineAttachment,
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
                    model: MiningService,
                    as: "services",
                    include: [
                        {
                            model: MiningServiceCard,
                            as: "service_cards",
                        },
                    ],
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
            message: "Failed to fetch regulation processes",
            error: error.message,
        });
    }
};

/* ===========================
   GET BY ID
=========================== */
const getMiningRegulationProcessById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const process = await MiningRegulationProcess.findByPk(id, {
            include: [
                {
                    model: MiningFramework,
                    as: "frameworks",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
                {
                    model: MiningGuideline,
                    as: "guidelines",
                    include: [
                        {
                            model: MiningGuidelineContent,
                            as: "contents",
                        },
                        {
                            model: MiningGuidelineAttachment,
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
                    model: MiningService,
                    as: "services",
                    include: [
                        {
                            model: MiningServiceCard,
                            as: "service_cards",
                        },
                    ],
                },
            ],
        });

        if (!process) {
            return res.status(404).json({
                success: false,
                message: "Regulation process not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: process,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch regulation process",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE REGULATION PROCESS
=========================== */
const updateMiningRegulationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const {
            title,
            description,
            publish,
            frameworks,
            guidelines,
            services,
        } = req.body;

        const process = await MiningRegulationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Regulation process not found",
            });
        }

        await process.update(
            {
                title: title || process.title,
                description: description || process.description,
                publish: publish !== undefined ? publish : process.publish,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= RESET FRAMEWORKS ========= */
        await MiningFramework.destroy({
            where: { mining_regulation_process_id: id },
            transaction: t,
        });

        /* ========= RESET GUIDELINES (cascade deletes contents & attachments) ========= */
        await MiningGuideline.destroy({
            where: { mining_regulation_process_id: id },
            transaction: t,
        });

        /* ========= RESET SERVICES (cascade deletes service cards) ========= */
        await MiningService.destroy({
            where: { mining_regulation_process_id: id },
            transaction: t,
        });

        /* ========= RECREATE FRAMEWORKS ========= */
        if (Array.isArray(frameworks)) {
            const frameworkRows = frameworks.map((fw) => ({
                mining_framework_id: uuidv4(),
                mining_regulation_process_id: id,
                title: fw.title,
                description: fw.description,
                objectives: fw.objectives || [],
                attachment_id: fw.attachment_id || null,
                attachment_overlay_text: fw.attachment_overlay_text || "Mining Framework",
                attachment_overlay_color: fw.attachment_overlay_color || "#ffffff",
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await MiningFramework.bulkCreate(frameworkRows, { transaction: t });
        }

        /* ========= RECREATE GUIDELINES ========= */
        if (Array.isArray(guidelines)) {
            for (const guideline of guidelines) {
                const newGuideline = await MiningGuideline.create(
                    {
                        mining_guideline_id: uuidv4(),
                        mining_regulation_process_id: id,
                        icon: guideline.icon || null,
                        title: guideline.title,
                        description: guideline.description || null,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                if (Array.isArray(guideline.contents)) {
                    const contentRows = guideline.contents.map((content) => ({
                        mining_guideline_content_id: uuidv4(),
                        mining_guideline_id: newGuideline.mining_guideline_id,
                        type: content.type || "others",
                        bg_color: content.bg_color || null,
                        icon: content.icon || null,
                        stamp: content.stamp || null,
                        title: content.title,
                        description: content.description || null,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await MiningGuidelineContent.bulkCreate(contentRows, { transaction: t });
                }

                if (Array.isArray(guideline.attachments)) {
                    const attachmentRows = guideline.attachments.map((att) => ({
                        mining_guideline_attachment_id: uuidv4(),
                        mining_guideline_id: newGuideline.mining_guideline_id,
                        attachment_id: att.attachment_id,
                        label: att.label,
                        created_at: new Date(),
                    }));

                    await MiningGuidelineAttachment.bulkCreate(attachmentRows, { transaction: t });
                }
            }
        }

        /* ========= RECREATE SERVICES ========= */
        if (Array.isArray(services)) {
            for (const service of services) {
                const newService = await MiningService.create(
                    {
                        mining_service_id: uuidv4(),
                        mining_regulation_process_id: id,
                        title: service.title,
                        description: service.description || null,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                if (Array.isArray(service.service_cards)) {
                    const cardRows = service.service_cards.map((card) => ({
                        mining_service_card_id: uuidv4(),
                        mining_service_id: newService.mining_service_id,
                        title: card.title,
                        sub_title: card.sub_title || null,
                        sub_title_color: card.sub_title_color || "#f8f521ff",
                        icon: card.icon || null,
                        description: card.description,
                        requirements: card.requirements || [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await MiningServiceCard.bulkCreate(cardRows, { transaction: t });
                }
            }
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Regulation process updated successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to update regulation process",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE (SOFT)
=========================== */
const deleteMiningRegulationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const process = await MiningRegulationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Regulation process not found",
            });
        }

        await process.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Regulation process deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to delete regulation process",
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

        const process = await MiningRegulationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Regulation process not found",
            });
        }

        if (publish === true) {
            await MiningRegulationProcess.update(
                { publish: false },
                {
                    where: {
                        mining_regulation_process_id: {
                            [Op.ne]: id,
                        },
                    },
                    transaction: t,
                }
            );
        }

        await process.update(
            { publish, updated_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: `Regulation process ${publish ? 'published' : 'unpublished'} successfully`,
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
    createMiningRegulationProcess,
    getAllMiningRegulationProcesses,
    getMiningRegulationProcessById,
    updateMiningRegulationProcess,
    deleteMiningRegulationProcess,
    togglePublishStatus,
};