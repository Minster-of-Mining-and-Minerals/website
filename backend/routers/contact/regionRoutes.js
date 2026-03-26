"use strict";
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
} = require("../../controllers/contact/regionController");

const {
  validateCreateRegion,
  validateUpdateRegion,
} = require("../../validators/contact/regionValidator");

// ================= REGION CRUD =================
router.post("/", authenticateToken, validateCreateRegion, createRegion);
router.get("/", getAllRegions);
router.get("/:id", getRegionById);
router.put("/:id", authenticateToken, validateUpdateRegion, updateRegion);
router.delete("/:id", authenticateToken, deleteRegion);

module.exports = router;
