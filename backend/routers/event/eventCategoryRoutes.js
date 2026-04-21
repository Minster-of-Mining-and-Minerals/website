"use strict";

const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createEventCategory,
  getAllEventCategories,
  updateEventCategory,
  deleteEventCategory,
} = require("../../controllers/event/eventCategoryController");

// Standalone category CRUD (no event coupling)
router.post("/", authenticateToken, createEventCategory);
router.get("/", getAllEventCategories);
router.put("/:id", authenticateToken, updateEventCategory);
router.delete("/:id", authenticateToken, deleteEventCategory);

module.exports = router;