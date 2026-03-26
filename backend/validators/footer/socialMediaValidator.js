"use strict";
const Joi = require("joi");
const { validate: isUuid } = require("uuid");

/* ================= COMMON SCHEMA ================= */
const uuidSchema = Joi.string()
  .custom((value, helpers) => {
    if (!isUuid(value)) return helpers.error("any.invalid");
    return value;
  })
  .messages({
    "any.invalid": "Must be a valid UUID.",
  });

/* ================= CREATE SOCIAL MEDIA ================= */
const createSocialMediaSchema = Joi.object({
  platform_name: Joi.string().max(100).required().messages({
    "string.empty": "Platform name is required.",
    "string.max": "Platform name cannot exceed 100 characters.",
  }),
  icon: Joi.string().max(255).required().messages({
    "string.empty": "Icon is required.",
    "string.max": "Icon cannot exceed 255 characters.",
  }),
  url: Joi.string().uri().max(500).required().messages({
    "string.empty": "URL is required.",
    "string.uri": "Must be a valid URL.",
    "string.max": "URL cannot exceed 500 characters.",
  }),
});

/* ================= UPDATE SOCIAL MEDIA ================= */
const updateSocialMediaSchema = Joi.object({
  platform_name: Joi.string().max(100).optional(),
  icon: Joi.string().max(255).optional(),
  url: Joi.string().uri().max(500).optional(),
});

/* ================= MIDDLEWARES ================= */
exports.validateCreateSocialMedia = (req, res, next) => {
  const { error } = createSocialMediaSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

exports.validateUpdateSocialMedia = (req, res, next) => {
  const { error } = updateSocialMediaSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};
