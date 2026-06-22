"use strict";

const { Slider, Attachment, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ============================================
// HELPER: Validate Attachment
// ============================================

const validateAttachment = async (attachment_id, transaction) => {
    if (!attachment_id) return;

    const attachment = await Attachment.findByPk(attachment_id, { transaction });

    if (!attachment) {
        throw new Error("Invalid attachment_id");
    }
};

// ============================================
// CREATE SLIDER
// ============================================

const createSlider = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            title,
            description,
            attachment_id,
            order,
            button_name,
            button_url,
            button2_name,
            button2_url,
        } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Slider title is required",
            });
        }

        await validateAttachment(attachment_id, t);

        const slider = await Slider.create(
            {
                slider_id: uuidv4(),
                title,
                description,
                attachment_id,
                order,
                button_name,
                button_url,
                button2_name,
                button2_url,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Slider created successfully",
            data: slider,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create slider",
        });
    }
};

// ============================================
// UPDATE SLIDER
// ============================================

const updateSlider = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;
        const {
            title,
            description,
            attachment_id,
            order,
            button_name,
            button_url,
            button2_name,
            button2_url,
        } = req.body;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid slider ID",
            });
        }

        const slider = await Slider.findOne({
            where: { slider_id: id, deleted_at: null },
            transaction: t,
        });

        if (!slider) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Slider not found",
            });
        }

        if (attachment_id) {
            await validateAttachment(attachment_id, t);
        }

        await slider.update(
            {
                title,
                description,
                attachment_id,
                order,
                button_name,
                button_url,
                button2_name,
                button2_url,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Slider updated successfully",
            data: slider,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update slider",
        });
    }
};

// ============================================
// GET ALL SLIDERS
// ============================================

const getAllSliders = async (req, res) => {
    try {
        const sliders = await Slider.findAll({
            where: { deleted_at: null },
            include: [
                {
                    model: Attachment,
                    as: "attachment",
                },
            ],
            order: [["order", "ASC"]],
        });

        return res.status(200).json({
            success: true,
            count: sliders.length,
            data: sliders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch sliders",
            error: error.message,
        });
    }
};

// ============================================
// GET SLIDER BY ID
// ============================================

const getSliderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid slider ID",
            });
        }

        const slider = await Slider.findOne({
            where: { slider_id: id, deleted_at: null },
            include: [
                {
                    model: Attachment,
                    as: "attachment",
                },
            ],
        });

        if (!slider) {
            return res.status(404).json({
                success: false,
                message: "Slider not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: slider,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch slider",
            error: error.message,
        });
    }
};

// ============================================
// DELETE SLIDER
// ============================================

const deleteSlider = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid slider ID",
            });
        }

        const slider = await Slider.findOne({
            where: { slider_id: id, deleted_at: null },
            transaction: t,
        });

        if (!slider) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Slider not found",
            });
        }

        await slider.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Slider deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();

        return res.status(500).json({
            success: false,
            message: "Failed to delete slider",
            error: error.message,
        });
    }
};

module.exports = {
    createSlider,
    getAllSliders,
    getSliderById,
    updateSlider,
    deleteSlider,
};