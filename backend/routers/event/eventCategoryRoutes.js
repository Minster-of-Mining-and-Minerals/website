"use strict";

const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  validateCreateCategory,
  validateUpdateCategory,
} = require("../../validators/event/eventCategoryValidator");

const {
  createEventCategory,
  getAllEventCategories,
  getCategoriesByEvent,
  updateEventCategory,
  deleteEventCategory,
} = require("../../controllers/event/eventCategoryController");

// ================= CRUD =================
router.post("/", authenticateToken, validateCreateCategory, createEventCategory);
router.get("/", getAllEventCategories);
router.get("/:event_id", getCategoriesByEvent);
router.put("/:id", authenticateToken, validateUpdateCategory, updateEventCategory);
router.delete("/:id", authenticateToken, deleteEventCategory);

module.exports = router;