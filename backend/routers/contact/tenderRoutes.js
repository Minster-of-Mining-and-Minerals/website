"use strict";

const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  checkPermission,
} = require("../../middlewares/authMiddleware");

const {
  validateCreateTender,
  validateUpdateTender,
} = require("../../validators/contact/tenderValidator");

const {
  createTender,
  getAllTenders,
  getTenderById,
  updateTender,
  deleteTender,
  publishTender,
  unpublishTender,
  closeTender,
} = require("../../controllers/contact/tenderController");

router.post(
  "/",
  authenticateToken,
  checkPermission("tenders", "create"),
  validateCreateTender,
  createTender,
);
router.get("/", getAllTenders);
router.get("/:id", getTenderById);
router.put(
  "/:id",
  authenticateToken,
  checkPermission("tenders", "update"),
  validateUpdateTender,
  updateTender,
);
router.delete(
  "/:id",
  authenticateToken,
  checkPermission("tenders", "delete"),
  deleteTender,
);
router.patch(
  "/:id/publish",
  authenticateToken,
  checkPermission("tenders", "publish"),
  publishTender,
);
router.patch(
  "/:id/unpublish",
  authenticateToken,
  checkPermission("tenders", "publish"),
  unpublishTender,
);
router.patch(
  "/:id/close",
  authenticateToken,
  checkPermission("tenders", "update"),
  closeTender,
);

module.exports = router;
