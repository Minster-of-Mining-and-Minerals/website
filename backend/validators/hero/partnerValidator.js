"use strict";

const Joi = require("joi");
const { validate: isUuid } = require("uuid");

// UUID validator
const uuidSchema = Joi.string().custom((value, helpers) => {
    if (!isUuid(value)) return helpers.error("any.invalid");
    return value;
});

// Attachment schema
const attachmentSchema = Joi.object({
    attachment_id: uuidSchema.required(),
    category: Joi.string()
        .valid("logo", "gallery", "document")
        .optional(),
});

// CREATE
const createPartnerSchema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().allow(null, "").optional(),
    attachments: Joi.array().items(attachmentSchema).optional(),
});

// UPDATE
const updatePartnerSchema = Joi.object({
    title: Joi.string().max(255).optional(),
    description: Joi.string().allow(null, "").optional(),
    attachments: Joi.array().items(attachmentSchema).optional(),
}).min(1);

// ================= EXPORTS =================

exports.validateCreatePartner = (req, res, next) => {
    const { error } = createPartnerSchema.validate(req.body);
    if (error)
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    next();
};

exports.validateUpdatePartner = (req, res, next) => {
    const { error } = updatePartnerSchema.validate(req.body);
    if (error)
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    next();
};

exports.validatePartnerId = (req, res, next) => {
    if (!isUuid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid partner ID",
        });
    }
    next();
};