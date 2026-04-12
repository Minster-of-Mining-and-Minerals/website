"use strict";

const {
    PetroleumProcess,
    ProcessStep,
    Step,
    Attachment,
    ProcessBlock,
    ProcessBlockAttachment,
    sequelize,
} = require("../../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE PROCESS
=========================== */
const createPetroleumProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { title, description, process_steps, process_blocks } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        /* ========= CREATE PROCESS ========= */
        const process = await PetroleumProcess.create(
            {
                petroleum_process_id: uuidv4(),
                title,
                description,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= PROCESS STEPS ========= */
        if (Array.isArray(process_steps)) {
            for (const ps of process_steps) {
                const processStep = await ProcessStep.create(
                    {
                        process_step_id: uuidv4(),
                        petroleum_process_id: process.petroleum_process_id,
                        title: ps.title,
                        description: ps.description,
                        content: ps.content,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                if (Array.isArray(ps.steps)) {
                    const stepRows = ps.steps.map((s, index) => ({
                        step_id: uuidv4(),
                        process_step_id: processStep.process_step_id,
                        description: s.description,
                        attachment_id: s.attachment_id,
                        order: s.order ?? index + 1,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await Step.bulkCreate(stepRows, { transaction: t });
                }
            }
        }

        /* ========= PROCESS BLOCKS (NEW) ========= */
        if (Array.isArray(process_blocks)) {
            for (const block of process_blocks) {
                const newBlock = await ProcessBlock.create(
                    {
                        process_block_id: uuidv4(),
                        petroleum_process_id: process.petroleum_process_id,
                        title: block.title,
                        description: block.description,
                        content: block.content,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                if (Array.isArray(block.attachments)) {
                    const attachmentRows = block.attachments.map(a => ({
                        process_block_attachment_id: uuidv4(),
                        process_block_id: newBlock.process_block_id,
                        attachment_id: a.attachment_id,
                        label: a.label,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await ProcessBlockAttachment.bulkCreate(attachmentRows, { transaction: t });
                }
            }
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Petroleum process created successfully",
            data: process,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to create petroleum process",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL PROCESSES
=========================== */
const getAllPetroleumProcesses = async (req, res) => {
    try {
        const { search } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        const processes = await PetroleumProcess.findAll({
            where: whereClause,
            include: [
                {
                    model: ProcessStep,
                    as: "process_steps",
                    include: [
                        {
                            model: Step,
                            as: "steps",
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
                    model: ProcessBlock,
                    as: "process_blocks",
                    include: [
                        {
                            model: ProcessBlockAttachment,
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
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            data: processes,
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
   GET PROCESS BY ID
=========================== */
const getPetroleumProcessById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid process ID",
            });
        }

        const process = await PetroleumProcess.findByPk(id, {
            include: [
                {
                    model: ProcessStep,
                    as: "process_steps",
                    include: [
                        {
                            model: Step,
                            as: "steps",
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
                    model: ProcessBlock,
                    as: "process_blocks",
                    include: [
                        {
                            model: ProcessBlockAttachment,
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
   UPDATE PROCESS
=========================== */
const updatePetroleumProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, description, process_steps, process_blocks } = req.body;

        const process = await PetroleumProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        await process.update(
            { title, description, updated_at: new Date() },
            { transaction: t }
        );

        /* ========= RESET STEPS ========= */
        const existingSteps = await ProcessStep.findAll({
            where: { petroleum_process_id: id },
            transaction: t,
        });

        const stepIds = existingSteps.map(ps => ps.process_step_id);

        await Step.destroy({
            where: { process_step_id: { [Op.in]: stepIds } },
            transaction: t,
        });

        await ProcessStep.destroy({
            where: { petroleum_process_id: id },
            transaction: t,
        });

        /* ========= RESET BLOCKS (NEW) ========= */
        const existingBlocks = await ProcessBlock.findAll({
            where: { petroleum_process_id: id },
            transaction: t,
        });

        const blockIds = existingBlocks.map(b => b.process_block_id);

        await ProcessBlockAttachment.destroy({
            where: { process_block_id: { [Op.in]: blockIds } },
            transaction: t,
        });

        await ProcessBlock.destroy({
            where: { petroleum_process_id: id },
            transaction: t,
        });

        /* ========= RECREATE STEPS ========= */
        if (Array.isArray(process_steps)) {
            for (const ps of process_steps) {
                const newPS = await ProcessStep.create(
                    {
                        process_step_id: uuidv4(),
                        petroleum_process_id: id,
                        title: ps.title,
                        description: ps.description,
                        content: ps.content,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                if (Array.isArray(ps.steps)) {
                    const rows = ps.steps.map((s, index) => ({
                        step_id: uuidv4(),
                        process_step_id: newPS.process_step_id,
                        description: s.description,
                        attachment_id: s.attachment_id,
                        order: s.order ?? index + 1,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await Step.bulkCreate(rows, { transaction: t });
                }
            }
        }

        /* ========= RECREATE BLOCKS ========= */
        if (Array.isArray(process_blocks)) {
            for (const block of process_blocks) {
                const newBlock = await ProcessBlock.create(
                    {
                        process_block_id: uuidv4(),
                        petroleum_process_id: id,
                        title: block.title,
                        description: block.description,
                        content: block.content,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );

                if (Array.isArray(block.attachments)) {
                    const rows = block.attachments.map(a => ({
                        process_block_attachment_id: uuidv4(),
                        process_block_id: newBlock.process_block_id,
                        attachment_id: a.attachment_id,
                        label: a.label,
                        created_at: new Date(),
                        updated_at: new Date(),
                    }));

                    await ProcessBlockAttachment.bulkCreate(rows, { transaction: t });
                }
            }
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
   DELETE PROCESS (SOFT)
=========================== */
const deletePetroleumProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const process = await PetroleumProcess.findByPk(id, { transaction: t });

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
        console.error("Delete Process Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete process",
            error: error.message,
        });
    }
};

/* ===========================
   TOGGLE PUBLISH PROCESS
=========================== */
const togglePublishPetroleumProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid process ID",
            });
        }

        const process = await PetroleumProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        const newStatus = !process.published;

        // If we are publishing this one, unpublish all others
        if (newStatus === true) {
            await PetroleumProcess.update(
                { published: false },
                {
                    where: { petroleum_process_id: { [Op.ne]: id } },
                    transaction: t,
                }
            );
        }

        await process.update({ published: newStatus }, { transaction: t });

        await t.commit();

        return res.status(200).json({
            success: true,
            message: newStatus ? "Process published successfully. Other processes have been unpublished." : "Process unpublished successfully.",
            data: process,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Toggle Publish Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to toggle publish status",
            error: error.message,
        });
    }
};

module.exports = {
    createPetroleumProcess,
    getAllPetroleumProcesses,
    getPetroleumProcessById,
    updatePetroleumProcess,
    deletePetroleumProcess,
    togglePublishPetroleumProcess,
};