"use strict";

const {
    PetroleumRegulationProcess,
    PetroleumRegulation,
    PetroleumDirective,
    PetroleumRegulationAttachment,
    Attachment,
    sequelize,
} = require("../../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");



/* ===========================
   CREATE PROCESS
=========================== */
const createPetroleumRegulationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { regulations, directives, attachments } = req.body;

        /* ========= CREATE PROCESS ========= */
        const process = await PetroleumRegulationProcess.create(
            {
                petroleum_regulation_process_id: uuidv4(),
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= REGULATIONS ========= */
        if (Array.isArray(regulations)) {
            const regulationRows = regulations.map((r, index) => ({
                petroleum_regulation_id: uuidv4(),
                petroleum_regulation_process_id: process.petroleum_regulation_process_id,
                order: r.order ?? index + 1,
                title: r.title,
                description: r.description,
                content: r.content || [],
                objectives: r.objectives || [],
                bullet_points: r.bullet_points || [],
                steps: r.steps || [],
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await PetroleumRegulation.bulkCreate(regulationRows, { transaction: t });
        }

        /* ========= DIRECTIVES ========= */
        if (Array.isArray(directives)) {
            const directiveRows = directives.map((d, index) => ({
                petroleum_directive_id: uuidv4(),
                petroleum_regulation_process_id: process.petroleum_regulation_process_id,
                order: d.order ?? index + 1,
                title: d.title,
                description: d.description,
                type: d.type || "sub",
                action_label: d.action_label,
                action: d.action,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await PetroleumDirective.bulkCreate(directiveRows, { transaction: t });
        }

        /* ========= ATTACHMENTS ========= */
        if (Array.isArray(attachments)) {
            const attachmentRows = attachments.map(a => ({
                petroleum_regulation_attachment_id: uuidv4(),
                petroleum_regulation_process_id: process.petroleum_regulation_process_id,
                attachment_id: a.attachment_id,
                label: a.label,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await PetroleumRegulationAttachment.bulkCreate(attachmentRows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Regulation process created successfully",
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
   GET ALL
=========================== */
const getAllPetroleumRegulationProcesses = async (req, res) => {
    try {
        const { published } = req.query;

        const whereClause = { deleted_at: null };
        if (published === "true") {
            whereClause.published = true;
        }

        const processes = await PetroleumRegulationProcess.findAll({
            where: whereClause,
            include: [
                {
                    model: PetroleumRegulation,
                    as: "regulations",
                    order: [["order", "ASC"]],
                },
                {
                    model: PetroleumDirective,
                    as: "directives",
                    order: [["order", "ASC"]],
                },
                {
                    model: PetroleumRegulationAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
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
   GET BY ID
=========================== */
const getPetroleumRegulationProcessById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const process = await PetroleumRegulationProcess.findByPk(id, {
            include: [
                {
                    model: PetroleumRegulation,
                    as: "regulations",
                    order: [["order", "ASC"]],
                },
                {
                    model: PetroleumDirective,
                    as: "directives",
                    order: [["order", "ASC"]],
                },
                {
                    model: PetroleumRegulationAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
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
   UPDATE
=========================== */
const updatePetroleumRegulationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { regulations, directives, attachments } = req.body;

        const process = await PetroleumRegulationProcess.findByPk(id, { transaction: t });

        if (!process) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Process not found",
            });
        }

        await process.update(
            { updated_at: new Date() },
            { transaction: t }
        );

        /* ========= RESET ========= */
        await PetroleumRegulation.destroy({
            where: { petroleum_regulation_process_id: id },
            transaction: t,
        });

        await PetroleumDirective.destroy({
            where: { petroleum_regulation_process_id: id },
            transaction: t,
        });

        await PetroleumRegulationAttachment.destroy({
            where: { petroleum_regulation_process_id: id },
            transaction: t,
        });

        /* ========= RECREATE ========= */
        if (Array.isArray(regulations)) {
            const rows = regulations.map((r, index) => ({
                petroleum_regulation_id: uuidv4(),
                petroleum_regulation_process_id: id,
                order: r.order ?? index + 1,
                title: r.title,
                description: r.description,
                content: r.content || [],
                objectives: r.objectives || [],
                bullet_points: r.bullet_points || [],
                steps: r.steps || [],
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await PetroleumRegulation.bulkCreate(rows, { transaction: t });
        }

        if (Array.isArray(directives)) {
            const rows = directives.map((d, index) => ({
                petroleum_directive_id: uuidv4(),
                petroleum_regulation_process_id: id,
                order: d.order ?? index + 1,
                title: d.title,
                description: d.description,
                type: d.type || "sub",
                action_label: d.action_label,
                action: d.action,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await PetroleumDirective.bulkCreate(rows, { transaction: t });
        }

        if (Array.isArray(attachments)) {
            const rows = attachments.map(a => ({
                petroleum_regulation_attachment_id: uuidv4(),
                petroleum_regulation_process_id: id,
                attachment_id: a.attachment_id,
                label: a.label,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await PetroleumRegulationAttachment.bulkCreate(rows, { transaction: t });
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
const deletePetroleumRegulationProcess = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const process = await PetroleumRegulationProcess.findByPk(id, { transaction: t });

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
   TOGGLE PUBLISH PROCESS
=========================== */
const togglePublishPetroleumRegulationProcess = async (req, res) => {
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

        const process = await PetroleumRegulationProcess.findByPk(id, { transaction: t });

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
            await PetroleumRegulationProcess.update(
                { published: false },
                {
                    where: { petroleum_regulation_process_id: { [Op.ne]: id } },
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
    createPetroleumRegulationProcess,
    getAllPetroleumRegulationProcesses,
    getPetroleumRegulationProcessById,
    updatePetroleumRegulationProcess,
    deletePetroleumRegulationProcess,
    togglePublishPetroleumRegulationProcess,
}; 