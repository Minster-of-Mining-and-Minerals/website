"use strict";

const Joi = require("joi");
const { validate: isUuid } = require("uuid");

const uuidSchema = Joi.string().custom((value, helpers) => {
  if (!isUuid(value)) return helpers.error("any.invalid");
  return value;
});

/* ================= CREATE ================= */

const createCategorySchema = Joi.object({
  event_id: uuidSchema.required(),

  categories: Joi.array().items(Joi.string().min(2)).min(1).required(),
});

/* ================= UPDATE ================= */

const updateCategorySchema = Joi.object({
  category: Joi.string().min(2).required(),
});


/* ================= MIDDLEWARE ================= */

exports.validateCreateCategory = (req, res, next) => {
  const { error } = createCategorySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

exports.validateUpdateCategory = (req, res, next) => {
  const { error } = updateCategorySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
