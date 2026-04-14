const express = require("express");
const router = express.Router();

const {
    validateCreatePetroleumRegulationProcess,
    validateUpdatePetroleumRegulationProcess,
} = require("../../../validators/sectors/petroleum/petroleumRegulationProcessValidator");

const { authenticateToken } = require("../../../middlewares/authMiddleware");

const {
    createPetroleumRegulationProcess,
    getAllPetroleumRegulationProcesses,
    getPetroleumRegulationProcessById,
    updatePetroleumRegulationProcess,
    deletePetroleumRegulationProcess,
    togglePublishPetroleumRegulationProcess,
} = require("../../../controllers/sectors/petroleum/petroleumRegulationProcessController");


router.post(
    "/",
    authenticateToken,
    validateCreatePetroleumRegulationProcess,
    createPetroleumRegulationProcess
);

router.get("/", getAllPetroleumRegulationProcesses);

router.get("/:id", getPetroleumRegulationProcessById);

router.put(
    "/:id",
    authenticateToken,
    validateUpdatePetroleumRegulationProcess,
    updatePetroleumRegulationProcess
);

router.put("/:id/publish", authenticateToken, togglePublishPetroleumRegulationProcess);

router.delete("/:id", authenticateToken, deletePetroleumRegulationProcess);

module.exports = router;