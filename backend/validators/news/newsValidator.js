"use strict";
const Joi = require("joi");
const { validate: isUuid } = require("uuid");

// =================== Create News Schema ===================
const createNewsSchema = Joi.object({
    description: Joi.string().min(10).required().messages({
        "string.empty": "Description is required.",
        "string.min": "Description must be at least 10 characters long.",
    }),

    attachment_ids: Joi.array()
        .items(
            Joi.string()
                .custom((value, helpers) => {
                    if (!isUuid(value)) return helpers.error("any.invalid");
                    return value;
                })
                .messages({
                    "any.invalid": "Each attachment ID must be a valid UUID.",
                })
        )
        .optional()
        .allow(null),

    tag_ids: Joi.array()
        .items(
            Joi.string()
                .custom((value, helpers) => {
                    if (!isUuid(value)) return helpers.error("any.invalid");
                    return value;
                })
                .messages({
                    "any.invalid": "Each tag ID must be a valid UUID.",
                })
        )
        .optional()
        .allow(null),
});

// =================== Update News Schema ===================
const updateNewsSchema = Joi.object({
    description: Joi.string().min(10).optional().messages({
        "string.min": "Description must be at least 10 characters long.",
    }),

    attachment_ids: Joi.array()
        .items(
            Joi.string()
                .custom((value, helpers) => {
                    if (!isUuid(value)) return helpers.error("any.invalid");
                    return value;
                })
                .messages({
                    "any.invalid": "Each attachment ID must be a valid UUID.",
                })
        )
        .optional()
        .allow(null),

    tag_ids: Joi.array()
        .items(
            Joi.string()
                .custom((value, helpers) => {
                    if (!isUuid(value)) return helpers.error("any.invalid");
                    return value;
                })
                .messages({
                    "any.invalid": "Each tag ID must be a valid UUID.",
                })
        )
        .optional()
        .allow(null),
});

// =================== Validators ===================
exports.validateCreateNews = (req, res, next) => {
    const { error } = createNewsSchema.validate(req.body, { abortEarly: true });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

exports.validateUpdateNews = (req, res, next) => {
    const { error } = updateNewsSchema.validate(req.body, { abortEarly: true });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};
