"use strict";

const express = require("express");
const router = express.Router();

const {
    validateCreateMiningRegulationProcess,
    validateUpdateMiningRegulationProcess,
    validateTogglePublish,
} = require("../../../validators/sectors/mining/miningRegulationProcessValidator");

const { authenticateToken } = require("../../../middlewares/authMiddleware");

const {
    createMiningRegulationProcess,
    getAllMiningRegulationProcesses,
    getMiningRegulationProcessById,
    updateMiningRegulationProcess,
    deleteMiningRegulationProcess,
    togglePublishStatus,
} = require("../../../controllers/sectors/mining/miningRegulationProcessController");

/* ===========================
   MINING REGULATION PROCESS CRUD
=========================== */

// Create a new mining regulation process
router.post(
    "/",
    authenticateToken,
    validateCreateMiningRegulationProcess,
    createMiningRegulationProcess
);

// Get all mining regulation processes (with optional filtering)
router.get("/", getAllMiningRegulationProcesses);

// Get a specific mining regulation process by ID
router.get("/:id", getMiningRegulationProcessById);

// Update a mining regulation process
router.put(
    "/:id",
    authenticateToken,
    validateUpdateMiningRegulationProcess,
    updateMiningRegulationProcess
);

// Soft delete a mining regulation process
router.delete(
    "/:id",
    authenticateToken,
    deleteMiningRegulationProcess
);

// Toggle publish status of a mining regulation process
router.patch(
    "/:id/publish",
    authenticateToken,
    validateTogglePublish,
    togglePublishStatus
);

module.exports = router;