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

/* ================= SECTION ================= */

const sectionSchema = Joi.object({
    section_id: uuidSchema.optional(),
    snapshot_id: uuidSchema.optional(),
    title: Joi.string().min(2).max(150).required().messages({
        "string.empty": "Section title is required.",
        "any.required": "Section title is required.",
    }),

    content: Joi.string().min(1).required().messages({
        "string.empty": "Section content is required.",
        "any.required": "Section content is required.",
    }),

    created_at: Joi.any().optional(),
    updated_at: Joi.any().optional(),
});

/* ================= CREATE SNAPSHOT ================= */

const createSnapshotSchema = Joi.object({
    snapshot_id: uuidSchema.optional(),
    title: Joi.string().min(5).required().messages({
        "string.empty": "Title is required.",
        "string.min": "Title must be at least 5 characters.",
    }),

    sector: Joi.string()
        .valid("mining", "geothermal", "petroleum", "others")
        .required()
        .messages({
            "any.only": "Invalid sector value.",
        }),

    description_one: Joi.string().min(1).required().messages({
        "string.empty": "First description is required.",
    }),

    description_two: Joi.string().min(1).required().messages({
        "string.empty": "Second description is required.",
    }),

    attachment_id: uuidSchema.required(),

    attachment_description: Joi.string().allow(null, "").optional(),

    is_published: Joi.boolean().optional(),

    sections: Joi.array()
        .items(sectionSchema)
        .optional()
        .default([]),
});

/* ================= UPDATE SNAPSHOT ================= */

const updateSnapshotSchema = Joi.object({
    snapshot_id: uuidSchema.optional(),

    title: Joi.string().min(5).optional(),

    sector: Joi.string()
        .valid("mining", "geothermal", "petroleum", "others")
        .optional(),

    description_one: Joi.string().min(1).optional(),

    description_two: Joi.string().min(1).optional(),

    attachment_id: uuidSchema.optional(),

    attachment_description: Joi.string().allow(null, "").optional(),

    is_published: Joi.boolean().optional(),

    sections: Joi.array().items(sectionSchema).optional(),

    created_at: Joi.any().optional(),
    updated_at: Joi.any().optional(),
});

/* ================= MIDDLEWARE ================= */

exports.validateCreateSnapshot = (req, res, next) => {
    const { error } = createSnapshotSchema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

exports.validateUpdateSnapshot = (req, res, next) => {
    const { error } = updateSnapshotSchema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};