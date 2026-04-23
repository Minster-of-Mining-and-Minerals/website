"use strict";

const express = require("express");
const router = express.Router();

const {
    getRoutes,
    updateRouteLabels,
    toggleRouteActiveStatus,
} = require("../../controllers/route/routeController");

const {
    validateUpdateRouteLabels,
    validateToggleRoute,
} = require("../../validators/route/routeValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management (labels + activation)
 */


/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes (with translations)
 *     tags: [Routes]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Language code (e.g., en, am)
 *     responses:
 *       200:
 *         description: List of routes
 */
router.get("/", getRoutes);


/**
 * @swagger
 * /routes/{id}/labels:
 *   put:
 *     summary: Update route labels (multi-language)
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               translations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     language_code:
 *                       type: string
 *                     label:
 *                       type: string
 *     responses:
 *       200:
 *         description: Labels updated
 */
router.put(
    "/:id/labels",
    authenticateToken,
    validateUpdateRouteLabels,
    updateRouteLabels
);


/**
 * @swagger
 * /routes/{id}/toggle-status:
 *   patch:
 *     summary: Activate / Deactivate route
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch(
    "/:id/toggle-status",
    authenticateToken,
    validateToggleRoute,
    toggleRouteActiveStatus
);

module.exports = router;