"use strict";

const Joi = require("joi");
const { validate: isUuid } = require("uuid");

/* ================= COMMON ================= */
const uuidSchema = Joi.string()
    .custom((value, helpers) => {
        if (!isUuid(value)) return helpers.error("any.invalid");
        return value;
    })
    .messages({
        "any.invalid": "Must be a valid UUID.",
    });

/* ================= CREATE CARD ================= */
const createCardSchema = Joi.object({
    title: Joi.string().max(255).required().messages({
        "string.empty": "Card title is required.",
        "string.max": "Title cannot exceed 255 characters.",
    }),

    description: Joi.string().allow(null, "").optional(),

    button_name: Joi.string().max(100).allow(null, "").optional().messages({
        "string.max": "Button name cannot exceed 100 characters.",
    }),

    button_url: Joi.string().max(500).allow(null, "").optional().messages({
        "string.max": "Button URL cannot exceed 500 characters.",
    }),

    attachment_id: uuidSchema.allow(null).optional(),
});

/* ================= UPDATE CARD ================= */
const updateCardSchema = Joi.object({
    title: Joi.string().max(255).optional(),

    description: Joi.string().allow(null, "").optional(),

    button_name: Joi.string().max(100).allow(null, "").optional(),

    button_url: Joi.string().max(500).allow(null, "").optional(),

    attachment_id: uuidSchema.allow(null).optional(),
});

/* ================= PARAM VALIDATION ================= */
const idParamSchema = Joi.object({
    id: uuidSchema.required(),
});

/* ================= MIDDLEWARE ================= */

// CREATE
exports.validateCreateCard = (req, res, next) => {
    const { error } = createCardSchema.validate(req.body, {
        abortEarly: true,
        allowUnknown: false,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

// UPDATE
exports.validateUpdateCard = (req, res, next) => {
    const { error } = updateCardSchema.validate(req.body, {
        abortEarly: true,
        allowUnknown: false,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

// PARAM (ID)
exports.validateCardId = (req, res, next) => {
    const { error } = idParamSchema.validate(req.params);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid card ID",
        });
    }

    next();
};