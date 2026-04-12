const express = require("express");
const router = express.Router();

const {
    validateCreatePetroleumProcess,
    validateUpdatePetroleumProcess,
} = require("../../../validators/sectors/petroleum/petroleumProcessValidator");

const { authenticateToken } = require("../../../middlewares/authMiddleware");

const {
    createPetroleumProcess,
    getAllPetroleumProcesses,
    getPetroleumProcessById,
    updatePetroleumProcess,
    deletePetroleumProcess,
    togglePublishPetroleumProcess,
} = require("../../../controllers/sectors/petroleum/petroleumProcessController");

/* ===========================
   PETROLEUM PROCESS CRUD
=========================== */

router.post(
    "/",
    authenticateToken,
    validateCreatePetroleumProcess,
    createPetroleumProcess
);

router.get("/", getAllPetroleumProcesses);

router.get("/:id", getPetroleumProcessById);

router.put(
    "/:id",
    authenticateToken,
    validateUpdatePetroleumProcess,
    updatePetroleumProcess
);

router.put(
    "/:id/publish",
    authenticateToken,
    togglePublishPetroleumProcess
);

router.delete("/:id", authenticateToken, deletePetroleumProcess);

module.exports = router;