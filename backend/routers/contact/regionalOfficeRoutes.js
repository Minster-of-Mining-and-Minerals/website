// routes/contact/regionalOfficeRoutes.js
"use strict";
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createRegionalOffice,
  getAllRegionalOffices,
  getRegionalOfficeById,
  updateRegionalOffice,
  deleteRegionalOffice,
} = require("../../controllers/contact/regionalOfficeController");

const {
  validateCreateRegionalOffice,
  validateUpdateRegionalOffice,
} = require("../../validators/contact/regionalOfficeValidator");

// ================= REGIONAL OFFICE CRUD =================
router.post(
  "/",
  authenticateToken,
  validateCreateRegionalOffice,
  createRegionalOffice,
);
router.get("/", getAllRegionalOffices);
router.get("/:id", getRegionalOfficeById);
router.put(
  "/:id",
  authenticateToken,
  validateUpdateRegionalOffice,
  updateRegionalOffice,
);
router.delete("/:id", authenticateToken, deleteRegionalOffice);

module.exports = router;
