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

/* ================= CREATE REGION ================= */
const createRegionSchema = Joi.object({
  code: Joi.string().max(50).required().messages({
    "string.empty": "Code is required.",
    "string.max": "Code cannot exceed 50 characters.",
  }),
  name: Joi.string().max(255).required().messages({
    "string.empty": "Name is required.",
    "string.max": "Name cannot exceed 255 characters.",
  }),
});

/* ================= UPDATE REGION ================= */
const updateRegionSchema = Joi.object({
  code: Joi.string().max(50).optional(),
  name: Joi.string().max(255).optional(),
});

/* ================= MIDDLEWARES ================= */
exports.validateCreateRegion = (req, res, next) => {
  const { error } = createRegionSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

exports.validateUpdateRegion = (req, res, next) => {
  const { error } = updateRegionSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};
