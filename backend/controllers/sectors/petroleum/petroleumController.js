"use strict";

const {
    PetroleumObjective,
    PetroleumAttachment,
    Attachment,
    sequelize,
} = require("../../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE OBJECTIVE
=========================== */
const createPetroleumObjective = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { title, description, content, objectives, attachments, type } = req.body;

        if (!title || !description || !type) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title, description, and type are required.",
            });
        }

        /* ========= UNIQUE HEADLINE CHECK ========= */
        if (type === "headline") {
            const existingHeadline = await PetroleumObjective.findOne({
                where: { type: "headline", deleted_at: null },
                transaction: t,
            });

            if (existingHeadline) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: "A headline objective already exists. There can only be one.",
                });
            }
        }

        const objective = await PetroleumObjective.create(
            {
                petroleum_objective_id: uuidv4(),
                title,
                type,
                description,
                content,
                objectives: objectives || [],
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= ATTACHMENTS ========= */
        if (Array.isArray(attachments) && attachments.length > 0) {
            const rows = attachments.map(({ attachment_id, label }) => ({
                petroleum_attachment_id: uuidv4(),
                petroleum_objective_id: objective.petroleum_objective_id,
                attachment_id,
                label,
                created_at: new Date(),
            }));

            await PetroleumAttachment.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Petroleum objective created successfully",
            data: objective,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Petroleum Objective Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create petroleum objective",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL OBJECTIVES
=========================== */
const getAllPetroleumObjectives = async (req, res) => {
    try {
        const { search } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        const objectives = await PetroleumObjective.findAll({
            where: whereClause,
            include: [
                {
                    model: PetroleumAttachment,
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
            message: "Petroleum objectives fetched successfully",
            count: objectives.length,
            data: objectives,
        });
    } catch (error) {
        console.error("Get Objectives Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch petroleum objectives",
            error: error.message,
        });
    }
};

/* ===========================
   GET OBJECTIVE BY ID
=========================== */
const getPetroleumObjectiveById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid objective ID",
            });
        }

        const objective = await PetroleumObjective.findByPk(id, {
            include: [
                {
                    model: PetroleumAttachment,
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

        if (!objective) {
            return res.status(404).json({
                success: false,
                message: "Petroleum objective not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Petroleum objective fetched successfully",
            data: objective,
        });
    } catch (error) {
        console.error("Get Objective Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch petroleum objective",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE OBJECTIVE
=========================== */
const updatePetroleumObjective = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, description, content, objectives, attachments, type } = req.body;

        const objective = await PetroleumObjective.findByPk(id, { transaction: t });

        if (!objective) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Petroleum objective not found",
            });
        }

        /* ========= UNIQUE HEADLINE CHECK ========= */
        if (type === "headline") {
            const existingHeadline = await PetroleumObjective.findOne({
                where: {
                    type: "headline",
                    deleted_at: null,
                    petroleum_objective_id: { [Op.ne]: id },
                },
                transaction: t,
            });

            if (existingHeadline) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: "Another headline objective already exists.",
                });
            }
        }

        await objective.update(
            {
                title,
                type,
                description,
                content,
                objectives,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= UPDATE ATTACHMENTS ========= */
        if (Array.isArray(attachments)) {
            await PetroleumAttachment.destroy({
                where: { petroleum_objective_id: id },
                transaction: t,
            });

            const rows = attachments.map(({ attachment_id, label }) => ({
                petroleum_attachment_id: uuidv4(),
                petroleum_objective_id: id,
                attachment_id,
                label,
                created_at: new Date(),
            }));

            await PetroleumAttachment.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Petroleum objective updated successfully",
            data: objective,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Objective Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update petroleum objective",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE OBJECTIVE (SOFT)
=========================== */
const deletePetroleumObjective = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const objective = await PetroleumObjective.findByPk(id, { transaction: t });

        if (!objective) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Petroleum objective not found",
            });
        }

        await objective.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Petroleum objective deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Objective Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete petroleum objective",
            error: error.message,
        });
    }
};

module.exports = {
    createPetroleumObjective,
    getAllPetroleumObjectives,
    getPetroleumObjectiveById,
    updatePetroleumObjective,
    deletePetroleumObjective,
};