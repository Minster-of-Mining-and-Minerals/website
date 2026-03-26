"use strict";

const Joi = require("joi");

// =================== Create Service Schema ===================
const createServiceSchema = Joi.object({
    icon: Joi.string().max(255).required().messages({
        "string.empty": "Service icon is required.",
    }),
    title: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Service title is required.",
        "string.min": "Service title must be at least 2 characters long.",
    }),
    content: Joi.string().min(5).max(555).required().messages({
        "string.empty": "Service content is required.",
        "string.min": "Service content must be at least 5 characters long.",
    }),
});

// =================== Update Service Schema ===================
const updateServiceSchema = Joi.object({
    icon: Joi.string().max(255).optional(),
    title: Joi.string().min(2).max(100).optional(),
    content: Joi.string().min(5).max(555).optional(),
});

// =================== Validators ===================
exports.validateCreateService = (req, res, next) => {
    const { error } = createServiceSchema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

exports.validateUpdateService = (req, res, next) => {
    const { error } = updateServiceSchema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};