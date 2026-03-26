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

/* ================= CREATE MESSAGE ================= */
const createMessageSchema = Joi.object({
  full_name: Joi.string().max(255).required().messages({
    "string.empty": "Full name is required.",
    "string.max": "Full name cannot exceed 255 characters.",
  }),

  email_address: Joi.string().email().max(255).required().messages({
    "string.empty": "Email address is required.",
    "string.email": "Must be a valid email address.",
    "string.max": "Email address cannot exceed 255 characters.",
  }),

  subject: Joi.string().max(255).required().messages({
    "string.empty": "Subject is required.",
    "string.max": "Subject cannot exceed 255 characters.",
  }),

  message: Joi.string().required().messages({
    "string.empty": "Message is required.",
  }),
});

/* ================= MIDDLEWARE ================= */
exports.validateCreateMessage = (req, res, next) => {
  const { error } = createMessageSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });

  next();
};
