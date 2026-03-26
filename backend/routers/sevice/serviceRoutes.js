const express = require("express");
const router = express.Router();

const {
    validateCreateService,
    validateUpdateService,
} = require("../../validators/service/serviceValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
} = require("../../controllers/service/serviceController");

// ===========================
// Service CRUD
// ===========================
router.post("/", authenticateToken, validateCreateService, createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", authenticateToken, validateUpdateService, updateService);
router.delete("/:id", authenticateToken, deleteService);

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Manage services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         service_id:
 *           type: string
 *         icon:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     CreateServiceRequest:
 *       type: object
 *       required:
 *         - icon
 *         - title
 *         - content
 *       properties:
 *         icon:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *
 *     UpdateServiceRequest:
 *       type: object
 *       properties:
 *         icon:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceRequest'
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid payload
 *       409:
 *         description: Service already exists
 *
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 */

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Service not found
 *
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServiceRequest'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *
 *   delete:
 *     summary: Delete a service permanently
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted successfully
 */

module.exports = router;