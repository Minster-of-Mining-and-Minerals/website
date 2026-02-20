"use strict";
const Joi = require("joi");
const { validate: isUuid } = require("uuid");

/* ================= COMMON SCHEMAS ================= */

const uuidSchema = Joi.string().custom((value, helpers) => {
    if (!isUuid(value)) return helpers.error("any.invalid");
    return value;
}).messages({
    "any.invalid": "Must be a valid UUID.",
});

const quillDeltaSchema = Joi.object({
    ops: Joi.array()
        .items(
            Joi.object({
                insert: Joi.alternatives()
                    .try(Joi.string(), Joi.object())
                    .required(),
                attributes: Joi.object().optional(),
            })
        )
        .min(1)
        .required(),
}).required();

const attachmentSchema = Joi.object({
    attachment_id: uuidSchema.required(),
    category: Joi.string()
        .valid("headline", "footer")
        .required(),
});

/* ================= CREATE NEWS ================= */

const createNewsSchema = Joi.object({
    title: Joi.string().min(10).required().messages({
        "string.empty": "Title is required.",
        "string.min": "Title must be at least 10 characters long.",
    }),

    author: Joi.string().min(3).optional(),

    content: quillDeltaSchema.messages({
        "object.base": "Content must be a valid Quill Delta object.",
    }),

    tags: Joi.array()
        .items(uuidSchema)
        .min(1)
        .required()
        .messages({
            "array.base": "Tags must be an array of UUIDs.",
            "array.min": "At least one tag is required.",
        }),

    attachments: Joi.array()
        .items(attachmentSchema)
        .optional()
        .default([]),
});

/* ================= UPDATE NEWS ================= */

const updateNewsSchema = Joi.object({
    title: Joi.string().min(10).optional(),

    author: Joi.string().min(3).optional(),

    content: quillDeltaSchema.optional(),

    tag_ids: Joi.array()
        .items(uuidSchema)
        .optional(),

    attachment_ids: Joi.array()
        .items(attachmentSchema)
        .optional(),
});

/* ================= MIDDLEWARES ================= */

exports.validateCreateNews = (req, res, next) => {
    const { error } = createNewsSchema.validate(req.body, {
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

exports.validateUpdateNews = (req, res, next) => {
    const { error } = updateNewsSchema.validate(req.body, {
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