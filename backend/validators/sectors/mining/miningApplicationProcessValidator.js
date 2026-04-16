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

/* ================= ATTACHMENT ================= */

const attachmentSchema = Joi.object({
    attachment_id: uuidSchema.required().messages({
        "any.required": "Attachment ID is required.",
    }),

    overlay_text: Joi.string().min(1).required().messages({
        "string.empty": "Overlay text is required.",
    }),

    overlay_icon: Joi.string().min(1).required().messages({
        "string.empty": "Overlay icon is required.",
    }),
});

/* ================= APPLICATION TYPE ================= */

const applicationTypeSchema = Joi.object({
    icon: Joi.string().required().messages({
        "string.empty": "Icon is required.",
    }),

    title: Joi.string().min(1).required().messages({
        "string.empty": "Title is required.",
    }),

    requirements: Joi.array().items(Joi.string()).optional().default([]),

    steps: Joi.array().items(Joi.string()).optional().default([]),

    action_label: Joi.string().required().messages({
        "string.empty": "Action label is required.",
    }),

    action_url: Joi.string().uri().required().messages({
        "string.empty": "Action URL is required.",
        "string.uri": "Action URL must be valid.",
    }),

    color: Joi.string().optional().allow(null, ""),
});

/* ================= CREATE ================= */

const createMiningApplicationProcessSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        "string.empty": "Title is required.",
        "string.min": "Title must be at least 3 characters.",
    }),

    description: Joi.string().optional().allow("", null),

    objectives: Joi.array().items(Joi.string()).optional().default([]),

    attachments: Joi.array()
        .items(attachmentSchema)
        .optional()
        .default([]),

    application_types: Joi.array()
        .items(applicationTypeSchema)
        .optional()
        .default([]),

    publish: Joi.boolean().optional().default(false),
});

/* ================= UPDATE ================= */

const updateMiningApplicationProcessSchema = Joi.object({
    title: Joi.string().min(3).optional(),

    description: Joi.string().optional().allow("", null),

    objectives: Joi.array().items(Joi.string()).optional(),

    attachments: Joi.array().items(attachmentSchema).optional(),

    application_types: Joi.array().items(applicationTypeSchema).optional(),

    publish: Joi.boolean().optional(),
});

/* ================= TOGGLE PUBLISH ================= */

const togglePublishSchema = Joi.object({
    publish: Joi.boolean().required().messages({
        "any.required": "Publish status is required.",
        "boolean.base": "Publish must be a boolean value.",
    }),
});

/* ================= MIDDLEWARE ================= */

exports.validateCreateMiningApplicationProcess = (req, res, next) => {
    const { error } = createMiningApplicationProcessSchema.validate(req.body, {
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

exports.validateUpdateMiningApplicationProcess = (req, res, next) => {
    const { error } = updateMiningApplicationProcessSchema.validate(req.body, {
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

exports.validateTogglePublish = (req, res, next) => {
    const { error } = togglePublishSchema.validate(req.body, {
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