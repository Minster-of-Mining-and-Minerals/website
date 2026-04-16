"use strict";

const express = require("express");
const router = express.Router();

const {
    validateCreateMiningApplicationProcess,
    validateUpdateMiningApplicationProcess,
    validateTogglePublish,
} = require("../../../validators/sectors/mining/miningApplicationProcessValidator");

const { authenticateToken } = require("../../../middlewares/authMiddleware");

const {
    createMiningApplicationProcess,
    getAllMiningApplicationProcesses,
    getMiningApplicationProcessById,
    updateMiningApplicationProcess,
    deleteMiningApplicationProcess,
    togglePublishStatus,
} = require("../../../controllers/sectors/mining/miningApplicationProcessController");

/* ===========================
   MINING APPLICATION PROCESS CRUD
=========================== */

router.post(
    "/",
    authenticateToken,
    validateCreateMiningApplicationProcess,
    createMiningApplicationProcess
);

router.get("/", getAllMiningApplicationProcesses);

router.get("/:id", getMiningApplicationProcessById);

router.put(
    "/:id",
    authenticateToken,
    validateUpdateMiningApplicationProcess,
    updateMiningApplicationProcess
);

router.delete(
    "/:id",
    authenticateToken,
    deleteMiningApplicationProcess
);

router.patch(
    "/:id/publish",
    authenticateToken,
    validateTogglePublish,
    togglePublishStatus
);

module.exports = router;