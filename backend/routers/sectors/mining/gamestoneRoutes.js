const express = require("express");
const router = express.Router();

const {
    validateCreateGamestone,
    validateUpdateGamestone,
} = require("../../../validators/sectors/mining/gamestoneValidator");

const { authenticateToken } = require("../../../middlewares/authMiddleware");

const {
    createGamestone,
    getAllGamestones,
    getGamestoneById,
    updateGamestone,
    deleteGamestone,
} = require("../../../controllers/sectors/mining/gamestoneController");

// ===========================
// GAMESTONE CRUD
// ===========================
router.post("/", authenticateToken, validateCreateGamestone, createGamestone);
router.get("/", getAllGamestones);
router.get("/:id", getGamestoneById);
router.put("/:id", authenticateToken, validateUpdateGamestone, updateGamestone);
router.delete("/:id", authenticateToken, deleteGamestone);

/**
 * @swagger
 * tags:
 *   name: Gamestone
 *   description: Manage gamestones with hierarchy and attachments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Gamestone:
 *       type: object
 *       properties:
 *         gamestone_id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         attachment_id:
 *           type: string
 *         discovered_date:
 *           type: string
 *           format: date
 *         parent_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         deleted_at:
 *           type: string
 *           format: date-time
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               attachment_id:
 *                 type: string
 *
 *     CreateGamestoneRequest:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         attachment_id:
 *           type: string
 *         discovered_date:
 *           type: string
 *           format: date
 *         parent_id:
 *           type: string
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               attachment_id:
 *                 type: string
 *
 *     UpdateGamestoneRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         attachment_id:
 *           type: string
 *         discovered_date:
 *           type: string
 *           format: date
 *         parent_id:
 *           type: string
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               attachment_id:
 *                 type: string
 */

/**
 * @swagger
 * /api/gamestones:
 *   post:
 *     summary: Create a new gamestone
 *     tags: [Gamestone]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGamestoneRequest'
 *     responses:
 *       201:
 *         description: Gamestone created successfully
 *
 *   get:
 *     summary: Get all gamestones (search & parent filter)
 *     tags: [Gamestone]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: parent_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of gamestones
 */

/**
 * @swagger
 * /api/gamestones/{id}:
 *   get:
 *     summary: Get a gamestone by ID
 *     tags: [Gamestone]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gamestone found
 *
 *   put:
 *     summary: Update a gamestone
 *     tags: [Gamestone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Updated successfully
 *
 *   delete:
 *     summary: Soft delete a gamestone
 *     tags: [Gamestone]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

module.exports = router;