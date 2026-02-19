const express = require("express");
const router = express.Router();

const {
    validateCreateTag,
    validateUpdateTag,
} = require("../../validators/news/tagValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
} = require("../../controllers/news/tagController");

// ===========================
// Tag CRUD
// ===========================
router.post("/", authenticateToken, validateCreateTag, createTag);
router.get("/", getAllTags);
router.get("/:id", getTagById);
router.put("/:id", authenticateToken, validateUpdateTag, updateTag);
router.delete("/:id", authenticateToken, deleteTag);

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Manage news tags
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         tag_id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         news_links:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               news_id:
 *                 type: string
 *
 *     CreateTagRequest:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *
 *     UpdateTagRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 */

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTagRequest'
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Invalid payload
 *       409:
 *         description: Tag already exists
 *
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of tags
 */

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag found
 *       404:
 *         description: Tag not found
 *
 *   put:
 *     summary: Update a tag
 *     tags: [Tags]
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
 *             $ref: '#/components/schemas/UpdateTagRequest'
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *
 *   delete:
 *     summary: Delete a tag permanently
 *     tags: [Tags]
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
 *         description: Tag deleted successfully
 */

module.exports = router;
