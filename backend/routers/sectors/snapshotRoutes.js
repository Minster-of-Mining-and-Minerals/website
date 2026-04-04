const express = require("express");
const router = express.Router();

const {
    validateCreateSnapshot,
    validateUpdateSnapshot,
} = require("../../validators/sectors/snapshotValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createSnapshot,
    getAllSnapshots,
    getSnapshotById,
    updateSnapshot,
    deleteSnapshot,
    togglePublishSnapshot,
} = require("../../controllers/sectors/snapshotController");

/* ===========================
   SNAPSHOT CRUD
=========================== */

router.post(
    "/",
    authenticateToken,
    validateCreateSnapshot,
    createSnapshot
);

router.get("/", getAllSnapshots);

router.get("/:id", getSnapshotById);

router.put(
    "/:id",
    authenticateToken,
    validateUpdateSnapshot,
    updateSnapshot
);

router.patch("/:id/publish", authenticateToken, togglePublishSnapshot);

router.delete("/:id", authenticateToken, deleteSnapshot);

module.exports = router;