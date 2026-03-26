"use strict";

const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createSlider,
    getAllSliders,
    getSliderById,
    updateSlider,
    deleteSlider,
} = require("../../controllers/hero/sliderController");

const {
    validateCreateSlider,
    validateUpdateSlider,
    validateSliderId,
} = require("../../validators/hero/sliderValidator");

// Public
router.get("/", getAllSliders);
router.get("/:id", validateSliderId, getSliderById);

// Admin
router.post("/", authenticateToken, validateCreateSlider, createSlider);
router.put(
    "/:id",
    authenticateToken,
    validateSliderId,
    validateUpdateSlider,
    updateSlider
);
router.delete("/:id", authenticateToken, validateSliderId, deleteSlider);

module.exports = router;