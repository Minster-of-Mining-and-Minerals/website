const express = require("express");
const router = express.Router();

const {
    validateCreatePetroleumObjective,
    validateUpdatePetroleumObjective,
} = require("../../../validators/sectors/petroleum/petroleumValidator");

const { authenticateToken } = require("../../../middlewares/authMiddleware");

const {
    createPetroleumObjective,
    getAllPetroleumObjectives,
    getPetroleumObjectiveById,
    updatePetroleumObjective,
    deletePetroleumObjective,
} = require("../../../controllers/sectors/petroleum/petroleumController");

/* ===========================
   PETROLEUM OBJECTIVE CRUD
=========================== */

router.post(
    "/",
    authenticateToken,
    validateCreatePetroleumObjective,
    createPetroleumObjective
);

router.get("/", getAllPetroleumObjectives);

router.get("/:id", getPetroleumObjectiveById);

router.put(
    "/:id",
    authenticateToken,
    validateUpdatePetroleumObjective,
    updatePetroleumObjective
);

router.delete("/:id", authenticateToken, deletePetroleumObjective);

module.exports = router;