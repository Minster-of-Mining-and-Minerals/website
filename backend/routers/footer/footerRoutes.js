"use strict";
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createFooter,
  getAllFooters,
  getFooterById,
  updateFooter,
  deleteFooter,
} = require("../../controllers/footer/footerController");

const {
  createFooterSection,
  getSectionsByFooterId,
} = require("../../controllers/footer/footerSectionController");

const {
  validateCreateFooter,
  validateUpdateFooter,
  validateCreateFooterSection,
} = require("../../validators/footer/footerValidator");

// ================= FOOTER CRUD =================
router.post("/", authenticateToken, validateCreateFooter, createFooter);
router.get("/", getAllFooters);
router.get("/:id", getFooterById);
router.put("/:id", authenticateToken, validateUpdateFooter, updateFooter);
router.delete("/:id", authenticateToken, deleteFooter);

// ================= FOOTER SECTION =================
router.post(
  "/section",
  authenticateToken,
  validateCreateFooterSection,
  createFooterSection,
);
router.get("/section/:footer_id", getSectionsByFooterId);

module.exports = router;
