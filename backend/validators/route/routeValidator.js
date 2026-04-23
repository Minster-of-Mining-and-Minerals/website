"use strict";

const Joi = require("joi");

// =================== Update Route Labels ===================
const updateRouteLabelsSchema = Joi.object({
    translations: Joi.array()
        .items(
            Joi.object({
                language_code: Joi.string()
                    .min(2)
                    .max(10)
                    .required()
                    .messages({
                        "string.empty": "Language code is required.",
                    }),

                label: Joi.string()
                    .min(1)
                    .max(255)
                    .required()
                    .messages({
                        "string.empty": "Label is required.",
                    }),
            })
        )
        .min(1)
        .required()
        .messages({
            "array.base": "Translations must be an array.",
            "array.min": "At least one translation is required.",
        }),
});

// =================== Toggle Active ===================
const toggleRouteSchema = Joi.object({
    is_active: Joi.boolean().required().messages({
        "any.required": "is_active is required.",
        "boolean.base": "is_active must be a boolean.",
    }),
});

// =================== Validators ===================

exports.validateUpdateRouteLabels = (req, res, next) => {
    const { error } = updateRouteLabelsSchema.validate(req.body, {
        abortEarly: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};

exports.validateToggleRoute = (req, res, next) => {
    const { error } = toggleRouteSchema.validate(req.body, {
        abortEarly: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};