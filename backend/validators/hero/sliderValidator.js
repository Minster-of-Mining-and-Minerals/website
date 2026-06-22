"use strict";

const Joi = require("joi");
const { validate: isUuid } = require("uuid");

const uuidSchema = Joi.string().custom((value, helpers) => {
    if (!isUuid(value)) return helpers.error("any.invalid");
    return value;
});

const createSliderSchema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().allow(null, "").optional(),
    attachment_id: uuidSchema.allow(null).optional(),
    order: Joi.number().integer().min(0).optional(),
    button_name: Joi.string().max(100).allow(null, "").optional(),
    button_url: Joi.string().max(500).allow(null, "").optional(),
    button2_name: Joi.string().max(100).allow(null, "").optional(),
    button2_url: Joi.string().max(500).allow(null, "").optional(),
});

const updateSliderSchema = Joi.object({
    title: Joi.string().max(255).optional(),
    description: Joi.string().allow(null, "").optional(),
    attachment_id: uuidSchema.allow(null).optional(),
    order: Joi.number().integer().min(0).optional(),
    button_name: Joi.string().max(100).allow(null, "").optional(),
    button_url: Joi.string().max(500).allow(null, "").optional(),
    button2_name: Joi.string().max(100).allow(null, "").optional(),
    button2_url: Joi.string().max(500).allow(null, "").optional(),
}).min(1);

exports.validateCreateSlider = (req, res, next) => {
    const { error } = createSliderSchema.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.message });
    next();
};

exports.validateUpdateSlider = (req, res, next) => {
    const { error } = updateSliderSchema.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.message });
    next();
};

exports.validateSliderId = (req, res, next) => {
    if (!isUuid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid slider ID",
        });
    }
    next();
};