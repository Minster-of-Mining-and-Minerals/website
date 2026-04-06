"use strict";

const {
    ASM,
    ASMAttachment,
    Objective,
    ASMPreview,
    Attachment,
    sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");

/* ===========================
   CREATE ASM
=========================== */
const createASM = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            attachments,
            headlines,
            strategic_objective,
            economic_impact,
            impact_contribution,
            strategic_pillars,
            key_initiatives,
            objectives,
            previews,
        } = req.body;

        const asm = await ASM.create(
            {
                asm_id: uuidv4(),
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= ATTACHMENTS ========= */
        if (Array.isArray(attachments)) {
            const rows = attachments.map(({ attachment_id, label }) => ({
                asm_attachment_id: uuidv4(),
                asm_id: asm.asm_id,
                attachment_id,
                label,
                created_at: new Date(),
            }));

            await ASMAttachment.bulkCreate(rows, { transaction: t });
        }

        /* ========= OBJECTIVE HANDLER ========= */
        const createObjectives = async (items, type) => {
            if (!Array.isArray(items)) return;

            const rows = items.map((item) => ({
                objective_id: uuidv4(),
                asm_id: asm.asm_id,
                type,
                icon: item.icon,
                title: item.title,
                description: item.description,
                content: item.content,
                foot_note: item.foot_note,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await Objective.bulkCreate(rows, { transaction: t });
        };

        await createObjectives(headlines, "headlines");
        await createObjectives(strategic_objective, "strategic_objective");
        await createObjectives(economic_impact, "economic_impact");
        await createObjectives(impact_contribution, "impact_contribution");
        await createObjectives(strategic_pillars, "strategic_pillars");
        await createObjectives(key_initiatives, "key_initiatives");
        await createObjectives(objectives, "objectives");

        /* ========= PREVIEW HANDLER ========= */
        if (Array.isArray(previews)) {
            const rows = previews.map((item) => ({
                preview_id: uuidv4(),
                asm_id: asm.asm_id,
                icon: item.icon,
                title: item.title,
                description: item.description,
                attachment_id: item.attachment_id || null,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await ASMPreview.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "ASM created successfully",
            data: asm,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create ASM Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create ASM",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL ASM
=========================== */
const getAllASM = async (req, res) => {
    try {
        const data = await ASM.findAll({
            where: { deleted_at: null },
            include: [
                {
                    model: ASMAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
                { model: Objective, as: "headlines", where: { type: "headlines" }, required: false },
                { model: Objective, as: "strategic_objective", where: { type: "strategic_objective" }, required: false },
                { model: Objective, as: "economic_impact", where: { type: "economic_impact" }, required: false },
                { model: Objective, as: "impact_contribution", where: { type: "impact_contribution" }, required: false },
                { model: Objective, as: "strategic_pillars", where: { type: "strategic_pillars" }, required: false },
                { model: Objective, as: "key_initiatives", where: { type: "key_initiatives" }, required: false },
                { model: Objective, as: "objectives", where: { type: "objectives" }, required: false },
                { model: ASMPreview, as: "previews", include: [{ model: Attachment, as: "attachment" }], required: false },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        console.error("Get ASM Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch ASM",
            error: error.message,
        });
    }
};

/* ===========================
   GET ASM BY ID
=========================== */
const getASMById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ASM ID",
            });
        }

        const asm = await ASM.findByPk(id, {
            include: [
                {
                    model: ASMAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
                { model: Objective, as: "headlines", where: { type: "headlines" }, required: false },
                { model: Objective, as: "strategic_objective", where: { type: "strategic_objective" }, required: false },
                { model: Objective, as: "economic_impact", where: { type: "economic_impact" }, required: false },
                { model: Objective, as: "impact_contribution", where: { type: "impact_contribution" }, required: false },
                { model: Objective, as: "strategic_pillars", where: { type: "strategic_pillars" }, required: false },
                { model: Objective, as: "key_initiatives", where: { type: "key_initiatives" }, required: false },
                { model: Objective, as: "objectives", where: { type: "objectives" }, required: false },
                { model: ASMPreview, as: "previews", include: [{ model: Attachment, as: "attachment" }], required: false },
            ],
        });

        if (!asm) {
            return res.status(404).json({
                success: false,
                message: "ASM not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: asm,
        });
    } catch (error) {
        console.error("Get ASM By ID Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch ASM",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE ASM
=========================== */
const updateASM = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const {
            attachments,
            headlines,
            strategic_objective,
            economic_impact,
            impact_contribution,
            strategic_pillars,
            key_initiatives,
            objectives,
            previews,
        } = req.body;

        const asm = await ASM.findByPk(id, { transaction: t });

        if (!asm) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "ASM not found",
            });
        }

        await asm.update(
            { updated_at: new Date() },
            { transaction: t }
        );

        /* ========= RESET ATTACHMENTS ========= */
        await ASMAttachment.destroy({
            where: { asm_id: id },
            transaction: t,
        });

        if (Array.isArray(attachments)) {
            const rows = attachments.map(({ attachment_id, label }) => ({
                asm_attachment_id: uuidv4(),
                asm_id: id,
                attachment_id,
                label,
                created_at: new Date(),
            }));

            await ASMAttachment.bulkCreate(rows, { transaction: t });
        }

        /* ========= RESET OBJECTIVES ========= */
        await Objective.destroy({
            where: { asm_id: id },
            transaction: t,
        });

        const createObjectives = async (items, type) => {
            if (!Array.isArray(items)) return;

            const rows = items.map((item) => ({
                objective_id: uuidv4(),
                asm_id: id,
                type,
                icon: item.icon,
                title: item.title,
                description: item.description,
                content: item.content,
                foot_note: item.foot_note,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await Objective.bulkCreate(rows, { transaction: t });
        };

        await createObjectives(headlines, "headlines");
        await createObjectives(strategic_objective, "strategic_objective");
        await createObjectives(economic_impact, "economic_impact");
        await createObjectives(impact_contribution, "impact_contribution");
        await createObjectives(strategic_pillars, "strategic_pillars");
        await createObjectives(key_initiatives, "key_initiatives");
        await createObjectives(objectives, "objectives");

        /* ========= RESET PREVIEWS ========= */
        await ASMPreview.destroy({
            where: { asm_id: id },
            transaction: t,
        });

        if (Array.isArray(previews)) {
            const rows = previews.map((item) => ({
                preview_id: uuidv4(),
                asm_id: id,
                icon: item.icon,
                title: item.title,
                description: item.description,
                attachment_id: item.attachment_id || null,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await ASMPreview.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "ASM updated successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update ASM Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update ASM",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE ASM (SOFT)
=========================== */
const deleteASM = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const asm = await ASM.findByPk(id, { transaction: t });

        if (!asm) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "ASM not found",
            });
        }

        await asm.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "ASM deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete ASM Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete ASM",
            error: error.message,
        });
    }
};

module.exports = {
    createASM,
    getAllASM,
    getASMById,
    updateASM,
    deleteASM,
};