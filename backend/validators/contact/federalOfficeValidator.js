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

/* ================= CREATE FEDERAL OFFICE ================= */
const createFederalOfficeSchema = Joi.object({
  office_address: Joi.string().required().messages({
    "string.empty": "Office address is required.",
  }),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be valid.",
  }),
  map_location: Joi.string().optional(),
});

/* ================= UPDATE FEDERAL OFFICE ================= */
const updateFederalOfficeSchema = Joi.object({
  office_address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),
  map_location: Joi.string().optional(),
});

/* ================= MIDDLEWARES ================= */
exports.validateCreateFederalOffice = (req, res, next) => {
  const { error } = createFederalOfficeSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

exports.validateUpdateFederalOffice = (req, res, next) => {
  const { error } = updateFederalOfficeSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};
