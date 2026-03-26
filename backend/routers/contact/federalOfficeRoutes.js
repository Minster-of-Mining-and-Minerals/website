"use strict";
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createFederalOffice,
  getAllFederalOffices,
  getFederalOfficeById,
  updateFederalOffice,
  deleteFederalOffice,
} = require("../../controllers/contact/federalOfficeController");

const {
  validateCreateFederalOffice,
  validateUpdateFederalOffice,
} = require("../../validators/contact/federalOfficeValidator");

// ================= FEDERAL OFFICE CRUD =================
router.post(
  "/",
  authenticateToken,
  validateCreateFederalOffice,
  createFederalOffice,
);
router.get("/", getAllFederalOffices);
router.get("/:id", getFederalOfficeById);
router.put(
  "/:id",
  authenticateToken,
  validateUpdateFederalOffice,
  updateFederalOffice,
);
router.delete("/:id", authenticateToken, deleteFederalOffice);

module.exports = router;
