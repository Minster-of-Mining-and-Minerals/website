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

/* ================= CREATE FOOTER ================= */
const createFooterSchema = Joi.object({
  title: Joi.string().max(255).required().messages({
    "string.empty": "Title is required.",
    "string.max": "Title cannot exceed 255 characters.",
  }),
  text: Joi.string().required().messages({
    "string.empty": "Text is required.",
  }),
  attachment_id: uuidSchema.optional(),
  content: Joi.string().optional(),
  sections: Joi.array()
    .items(
      Joi.object({
        section_name: Joi.string().max(255).required(),
        links: Joi.array().items(
          Joi.object({
            label: Joi.string().required(),
            url: Joi.string().uri().required(),
          }),
        ),
      }),
    )
    .optional(),
});

/* ================= UPDATE FOOTER ================= */
const updateFooterSchema = Joi.object({
  title: Joi.string().max(255).optional(),
  text: Joi.string().optional(),
  attachment_id: uuidSchema.optional(),
  content: Joi.string().optional(),
  sections: Joi.array()
    .items(
      Joi.object({
        footer_section_id: uuidSchema.optional(),
        section_name: Joi.string().max(255).required(),
        links: Joi.array().items(
          Joi.object({
            label: Joi.string().required(),
            url: Joi.string().uri().required(),
          }),
        ),
      }),
    )
    .optional(),
});

/* ================= CREATE FOOTER SECTION ================= */
const createFooterSectionSchema = Joi.object({
  footer_id: uuidSchema.required(),
  section_name: Joi.string().max(255).required(),
  links: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().required(),
        url: Joi.string().uri().required(),
      }),
    )
    .optional(),
});

/* ================= MIDDLEWARES ================= */
exports.validateCreateFooter = (req, res, next) => {
  const { error } = createFooterSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

exports.validateUpdateFooter = (req, res, next) => {
  const { error } = updateFooterSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

exports.validateCreateFooterSection = (req, res, next) => {
  const { error } = createFooterSectionSchema.validate(req.body, {
    abortEarly: true,
    allowUnknown: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};
