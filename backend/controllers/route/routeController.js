"use strict";

const {
    Route,
    RouteTranslation,
    sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");


// ============================================
// GET ALL ROUTES (with translations)
// ============================================
const getRoutes = async (req, res) => {
    try {
        const { lang } = req.query; // optional: "en", "am"

        const routes = await Route.findAll({
            include: [
                {
                    model: RouteTranslation,
                    as: "translations",
                    ...(lang && {
                        where: { language_code: lang },
                    }),
                    required: false,
                },
                {
                    model: Route,
                    as: "children",
                    required: false,
                    include: [
                        {
                            model: RouteTranslation,
                            as: "translations",
                            ...(lang && {
                                where: { language_code: lang },
                            }),
                            required: false,
                        },
                    ],
                },
            ],
            order: [
                ["order", "ASC"],
                [{ model: Route, as: "children" }, "order", "ASC"],
            ],
        });

        return res.status(200).json({
            success: true,
            message: "Routes fetched successfully",
            data: routes,
        });
    } catch (error) {
        console.error("Error fetching routes:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch routes",
            error: error.message,
        });
    }
};


// ============================================
// UPDATE ROUTE LABELS (MULTI-LANGUAGE)
// ============================================
const updateRouteLabels = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id: route_id } = req.params;
        const { translations } = req.body;
        /**
         * translations = [
         *   { language_code: "en", label: "Home" },
         *   { language_code: "am", label: "መነሻ" }
         * ]
         */

        if (!isUuid(route_id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid route ID format",
            });
        }

        const route = await Route.findByPk(route_id, { transaction: t });
        if (!route) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Route not found",
            });
        }

        if (!Array.isArray(translations) || translations.length === 0) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Translations must be a non-empty array",
            });
        }

        for (const tr of translations) {
            const { language_code, label } = tr;

            if (!language_code || !label) {
                await t.rollback();
                return res.status(400).json({
                    success: false,
                    message: "Each translation must have language_code and label",
                });
            }

            const existing = await RouteTranslation.findOne({
                where: { route_id, language_code },
                transaction: t,
            });

            if (existing) {
                await existing.update(
                    {
                        label,
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );
            } else {
                await RouteTranslation.create(
                    {
                        route_translation_id: uuidv4(),
                        route_id,
                        language_code,
                        label,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    { transaction: t }
                );
            }
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Route translations updated successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Error updating route labels:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update route labels",
            error: error.message,
        });
    }
};


// ============================================
// TOGGLE ROUTE ACTIVE STATUS
// ============================================
const toggleRouteActiveStatus = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { is_active } = req.body;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid route ID format",
            });
        }

        if (typeof is_active !== "boolean") {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "is_active must be boolean",
            });
        }

        const route = await Route.findByPk(id, { transaction: t });

        if (!route) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Route not found",
            });
        }

        await route.update(
            {
                is_active,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: `Route ${is_active ? "activated" : "deactivated"} successfully`,
            data: {
                route_id: id,
                is_active,
            },
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Error toggling route:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to toggle route",
            error: error.message,
        });
    }
};


module.exports = {
    getRoutes,
    updateRouteLabels,
    toggleRouteActiveStatus,
};