"use strict";
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
  createSocialMedia,
  getAllSocialMedias,
  getSocialMediaById,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../../controllers/footer/socialMediaController");

const {
  validateCreateSocialMedia,
  validateUpdateSocialMedia,
} = require("../../validators/footer/socialMediaValidator");

// ================= SOCIAL MEDIA CRUD =================
router.post(
  "/",
  authenticateToken,
  validateCreateSocialMedia,
  createSocialMedia,
);
router.get("/", getAllSocialMedias);
router.get("/:id", getSocialMediaById);
router.put(
  "/:id",
  authenticateToken,
  validateUpdateSocialMedia,
  updateSocialMedia,
);
router.delete("/:id", authenticateToken, deleteSocialMedia);

module.exports = router;
