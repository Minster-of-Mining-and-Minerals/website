const express = require("express");
const router = express.Router();

const {
    validateCreateInvestigateEthiopia,
    validateUpdateInvestigateEthiopia,
} = require("../../validators/investigate_ethiopia/investigateEthiopiaValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createInvestigateEthiopia,
    getAllInvestigateEthiopia,
    getInvestigateEthiopiaById,
    updateInvestigateEthiopia,
    deleteInvestigateEthiopia,
} = require("../../controllers/investgate_ethiopia/investigateEthiopiaController");

/* ===========================
   CRUD
=========================== */

router.post(
    "/",
    authenticateToken,
    validateCreateInvestigateEthiopia,
    createInvestigateEthiopia
);

router.get("/", getAllInvestigateEthiopia);

router.get("/:id", getInvestigateEthiopiaById);

router.put(
    "/:id",
    authenticateToken,
    validateUpdateInvestigateEthiopia,
    updateInvestigateEthiopia
);

router.delete("/:id", authenticateToken, deleteInvestigateEthiopia);

module.exports = router;