"use strict";
const Joi = require("joi");
const { validate: isUuid } = require("uuid");

// =================== Create Tag Schema ===================
const createTagSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Tag name is required.",
        "string.min": "Tag name must be at least 2 characters long.",
    }),
    slug: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Slug is required.",
        "string.min": "Slug must be at least 2 characters long.",
    }),
});

// =================== Update Tag Schema ===================
const updateTagSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    slug: Joi.string().min(2).max(100).optional(),
});

// =================== Validators ===================
exports.validateCreateTag = (req, res, next) => {
    const { error } = createTagSchema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

exports.validateUpdateTag = (req, res, next) => {
    const { error } = updateTagSchema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};
