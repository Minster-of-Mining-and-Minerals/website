"use strict";

const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  validateCreateEvent,
  validateUpdateEvent,
} = require("../../validators/event/eventValidator");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveEvent,
} = require("../../controllers/event/eventController");

// ================= CRUD =================
router.post("/", authenticateToken, validateCreateEvent, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", authenticateToken, validateUpdateEvent, updateEvent);
router.delete("/:id", authenticateToken, deleteEvent);

// ================= APPROVAL =================
router.patch("/:id/approve", authenticateToken, approveEvent);

module.exports = router;
