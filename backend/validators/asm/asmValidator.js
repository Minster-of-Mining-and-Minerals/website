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
    asm_attachment_id: Joi.string().optional(),
    asm_id: Joi.string().optional(),
    attachment_id: uuidSchema.required(),
    label: Joi.string().min(1).max(100).required(),
    created_at: Joi.any().optional(),
    updated_at: Joi.any().optional(),
    attachment: Joi.any().optional(),
});

/* ================= OBJECTIVE ================= */

const objectiveSchema = Joi.object({
    objective_id: Joi.string().optional(),
    asm_id: Joi.string().optional(),
    type: Joi.string().optional(),
    icon: Joi.string().allow("", null).optional(),
    title: Joi.string().min(3).required(),
    description: Joi.string().allow("", null).optional(),
    content: Joi.string().allow("", null).optional(),
    foot_note: Joi.string().allow("", null).optional(),
    created_at: Joi.any().optional(),
    updated_at: Joi.any().optional(),
    deleted_at: Joi.any().optional(),
});

/* ================= PREVIEW ================= */

const previewSchema = Joi.object({
    preview_id: Joi.string().optional(),
    asm_id: Joi.string().optional(),
    icon: Joi.string().allow("", null).optional(),
    title: Joi.string().min(1).required(),
    description: Joi.string().allow("", null).optional(),
    attachment_id: Joi.string().allow("", null).optional(),
    created_at: Joi.any().optional(),
    updated_at: Joi.any().optional(),
    attachment: Joi.any().optional(),
});

/* ================= CREATE ASM ================= */

const createASMSchema = Joi.object({
    attachments: Joi.array().items(attachmentSchema).optional(),

    headlines: Joi.array().items(objectiveSchema).optional(),
    strategic_objective: Joi.array().items(objectiveSchema).optional(),
    economic_impact: Joi.array().items(objectiveSchema).optional(),
    impact_contribution: Joi.array().items(objectiveSchema).optional(),
    strategic_pillars: Joi.array().items(objectiveSchema).optional(),
    key_initiatives: Joi.array().items(objectiveSchema).optional(),
    objectives: Joi.array().items(objectiveSchema).optional(),
    previews: Joi.array().items(previewSchema).optional(),
});

/* ================= UPDATE ASM ================= */

const updateASMSchema = Joi.object({
    attachments: Joi.array().items(attachmentSchema).optional(),

    headlines: Joi.array().items(objectiveSchema).optional(),
    strategic_objective: Joi.array().items(objectiveSchema).optional(),
    economic_impact: Joi.array().items(objectiveSchema).optional(),
    impact_contribution: Joi.array().items(objectiveSchema).optional(),
    strategic_pillars: Joi.array().items(objectiveSchema).optional(),
    key_initiatives: Joi.array().items(objectiveSchema).optional(),
    objectives: Joi.array().items(objectiveSchema).optional(),
    previews: Joi.array().items(previewSchema).optional(),
});

/* ================= MIDDLEWARE ================= */

exports.validateCreateASM = (req, res, next) => {
    const { error, value } = createASMSchema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

exports.validateUpdateASM = (req, res, next) => {
    const { error, value } = updateASMSchema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};
