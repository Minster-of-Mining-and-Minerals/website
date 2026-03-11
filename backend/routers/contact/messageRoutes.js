"use strict";
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} = require("../../controllers/contact/messageController");

const {
  validateCreateMessage,
} = require("../../validators/contact/messageValidator");

// ================= MESSAGE ROUTES =================

// Public route (contact form submission)
router.post("/", validateCreateMessage, createMessage);

// Admin routes
router.get("/", authenticateToken, getAllMessages);
router.get("/:id", authenticateToken, getMessageById);
router.delete("/:id", authenticateToken, deleteMessage);

module.exports = router;
