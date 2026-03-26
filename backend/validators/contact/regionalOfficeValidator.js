// validators/contact/regionalOfficeValidator.js
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

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .optional();

/* ================= CREATE REGIONAL OFFICE ================= */
const createRegionalOfficeSchema = Joi.object({
  region_id: uuidSchema.required().messages({
    "any.required": "Region ID is required.",
  }),
  bureau_name: Joi.string().max(255).required().messages({
    "string.empty": "Bureau name is required.",
    "string.max": "Bureau name cannot exceed 255 characters.",
  }),
  address: Joi.string().optional().allow(""),
  director: Joi.string().optional().allow(""),
  email: emailSchema,
  phone: Joi.string().max(50).optional(),
  licensing_contacts: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().max(255).required(),
        email: emailSchema,
        phone: Joi.string().max(50).optional(),
      }),
    )
    .optional(),
});

/* ================= UPDATE REGIONAL OFFICE ================= */
const updateRegionalOfficeSchema = Joi.object({
  region_id: uuidSchema.optional(),
  bureau_name: Joi.string().max(255).optional(),
  address: Joi.string().optional().allow(""),
  director: Joi.string().optional().allow(""),
  email: emailSchema,
  phone: Joi.string().max(50).optional(),
  licensing_contacts: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().max(255).required(),
        email: emailSchema,
        phone: Joi.string().max(50).optional(),
      }),
    )
    .optional(),
});

/* ================= MIDDLEWARES ================= */
exports.validateCreateRegionalOffice = (req, res, next) => {
  const { error } = createRegionalOfficeSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

exports.validateUpdateRegionalOffice = (req, res, next) => {
  const { error } = updateRegionalOfficeSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};
