"use strict";

const {
    InvestigateEthiopia,
    InvestigationStrategy,
    InvestigationAction,
    Attachment,
    sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");

/* ===========================
   CREATE
=========================== */
const createInvestigateEthiopia = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            headlines,
            strategic_minerals,
            autonomy,
            autonomous_institutions,
            strategic_pillars,
            ambition,
            global_proclamation,
            investigation_action,
        } = req.body;

        const record = await InvestigateEthiopia.create(
            {
                investigate_ethiopia_id: uuidv4(),
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= STRATEGY HANDLER ========= */
        const createStrategies = async (items, type) => {
            if (!Array.isArray(items)) return;

            const rows = items.map((item) => ({
                investigation_strategy_id: uuidv4(),
                investigate_ethiopia_id: record.investigate_ethiopia_id,
                type,
                icon: item.icon,
                title: item.title,
                description: item.description,
                content: item.content,
                tags: item.tags,
                attachment_id: item.attachment_id || null,
                link: item.link,
                bg_color: item.bg_color,
                fg_color: item.fg_color,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await InvestigationStrategy.bulkCreate(rows, { transaction: t });
        };

        await createStrategies(headlines, "headlines");
        await createStrategies(strategic_minerals, "strategic_minerals");
        await createStrategies(autonomy, "autonomy");
        await createStrategies(autonomous_institutions, "autonomous_institutions");
        await createStrategies(strategic_pillars, "strategic_pillars");
        await createStrategies(ambition, "ambition");
        await createStrategies(global_proclamation, "global_proclamation");

        /* ========= ACTIONS ========= */
        if (Array.isArray(investigation_action)) {
            const rows = investigation_action.map((item) => ({
                investigation_action_id: uuidv4(),
                investigate_ethiopia_id: record.investigate_ethiopia_id,
                title: item.title,
                description: item.description,
                action: item.action,
                link: item.link,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await InvestigationAction.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Created successfully",
            data: record,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL
=========================== */
const getAllInvestigateEthiopia = async (req, res) => {
    try {
        const data = await InvestigateEthiopia.findAll({
            where: { deleted_at: null },
            include: [
                { model: InvestigationStrategy, as: "headlines", where: { type: "headlines" }, required: false },
                { model: InvestigationStrategy, as: "strategic_minerals", where: { type: "strategic_minerals" }, required: false },
                { model: InvestigationStrategy, as: "autonomy", where: { type: "autonomy" }, required: false },
                { model: InvestigationStrategy, as: "autonomous_institutions", where: { type: "autonomous_institutions" }, required: false },
                { model: InvestigationStrategy, as: "strategic_pillars", where: { type: "strategic_pillars" }, required: false },
                { model: InvestigationStrategy, as: "ambition", where: { type: "ambition" }, required: false },
                { model: InvestigationStrategy, as: "global_proclamation", where: { type: "global_proclamation" }, required: false, include: [{ model: Attachment, as: "attachment" }] },
                { model: InvestigationAction, as: "investigation_action", required: false },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        console.error("Get All Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch",
            error: error.message,
        });
    }
};

/* ===========================
   GET BY ID
=========================== */
const getInvestigateEthiopiaById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
            });
        }

        const record = await InvestigateEthiopia.findByPk(id, {
            include: [
                { model: InvestigationStrategy, as: "headlines", where: { type: "headlines" }, required: false },
                { model: InvestigationStrategy, as: "strategic_minerals", where: { type: "strategic_minerals" }, required: false },
                { model: InvestigationStrategy, as: "autonomy", where: { type: "autonomy" }, required: false },
                { model: InvestigationStrategy, as: "autonomous_institutions", where: { type: "autonomous_institutions" }, required: false },
                { model: InvestigationStrategy, as: "strategic_pillars", where: { type: "strategic_pillars" }, required: false },
                { model: InvestigationStrategy, as: "ambition", where: { type: "ambition" }, required: false },
                { model: InvestigationStrategy, as: "global_proclamation", where: { type: "global_proclamation" }, required: false },
                { model: InvestigationAction, as: "investigation_action", required: false },
            ],
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: record,
        });
    } catch (error) {
        console.error("Get By ID Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE
=========================== */
const updateInvestigateEthiopia = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const {
            headlines,
            strategic_minerals,
            autonomy,
            autonomous_institutions,
            strategic_pillars,
            ambition,
            global_proclamation,
            investigation_action,
        } = req.body;

        const record = await InvestigateEthiopia.findByPk(id, { transaction: t });

        if (!record) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Not found",
            });
        }

        await record.update({ updated_at: new Date() }, { transaction: t });

        /* RESET STRATEGIES */
        await InvestigationStrategy.destroy({
            where: { investigate_ethiopia_id: id },
            transaction: t,
        });

        const createStrategies = async (items, type) => {
            if (!Array.isArray(items)) return;

            const rows = items.map((item) => ({
                investigation_strategy_id: uuidv4(),
                investigate_ethiopia_id: id,
                type,
                icon: item.icon,
                title: item.title,
                description: item.description,
                content: item.content,
                tags: item.tags,
                attachment_id: item.attachment_id || null,
                link: item.link,
                bg_color: item.bg_color,
                fg_color: item.fg_color,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await InvestigationStrategy.bulkCreate(rows, { transaction: t });
        };

        await createStrategies(headlines, "headlines");
        await createStrategies(strategic_minerals, "strategic_minerals");
        await createStrategies(autonomy, "autonomy");
        await createStrategies(autonomous_institutions, "autonomous_institutions");
        await createStrategies(strategic_pillars, "strategic_pillars");
        await createStrategies(ambition, "ambition");
        await createStrategies(global_proclamation, "global_proclamation");

        /* RESET ACTIONS */
        await InvestigationAction.destroy({
            where: { investigate_ethiopia_id: id },
            transaction: t,
        });

        if (Array.isArray(investigation_action)) {
            const rows = investigation_action.map((item) => ({
                investigation_action_id: uuidv4(),
                investigate_ethiopia_id: id,
                title: item.title,
                description: item.description,
                action: item.action,
                link: item.link,
                created_at: new Date(),
                updated_at: new Date(),
            }));

            await InvestigationAction.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE (SOFT)
=========================== */
const deleteInvestigateEthiopia = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const record = await InvestigateEthiopia.findByPk(id, { transaction: t });

        if (!record) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Not found",
            });
        }

        await record.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete",
            error: error.message,
        });
    }
};

module.exports = {
    createInvestigateEthiopia,
    getAllInvestigateEthiopia,
    getInvestigateEthiopiaById,
    updateInvestigateEthiopia,
    deleteInvestigateEthiopia,
};