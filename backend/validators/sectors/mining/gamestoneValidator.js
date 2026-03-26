"use strict";

const Joi = require("joi");
const { validate: isUuid } = require("uuid");

/* ================= COMMON ================= */

const uuidSchema = Joi.string().custom((value, helpers) => {
    if (!isUuid(value)) return helpers.error("any.invalid");
    return value;
}).messages({
    "any.invalid": "Must be a valid UUID.",
});

const attachmentSchema = Joi.object({
    attachment_id: uuidSchema.required(),
});

/* ================= CREATE ================= */

const createGamestoneSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        "string.empty": "Title is required.",
        "string.min": "Title must be at least 3 characters.",
    }),

    description: Joi.string().allow(null, "").optional(),

    attachment_id: uuidSchema.allow(null).optional(),

    discovered_date: Joi.date().iso().allow(null).optional(),

    parent_id: uuidSchema.allow(null).optional(),

    attachments: Joi.array()
        .items(attachmentSchema)
        .optional()
        .default([]),
});

/* ================= UPDATE ================= */

const updateGamestoneSchema = Joi.object({
    title: Joi.string().min(3).optional(),

    description: Joi.string().allow(null, "").optional(),

    attachment_id: uuidSchema.allow(null).optional(),

    discovered_date: Joi.date().iso().allow(null).optional(),

    parent_id: uuidSchema.allow(null).optional(),

    attachments: Joi.array()
        .items(attachmentSchema)
        .optional(),
});

/* ================= MIDDLEWARE ================= */

exports.validateCreateGamestone = (req, res, next) => {
    const { error } = createGamestoneSchema.validate(req.body, {
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

exports.validateUpdateGamestone = (req, res, next) => {
    const { error } = updateGamestoneSchema.validate(req.body, {
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