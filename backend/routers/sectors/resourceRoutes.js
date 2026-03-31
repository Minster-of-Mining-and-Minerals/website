const express = require("express");
const router = express.Router();

const {
    validateCreateResource,
    validateUpdateResource,
} = require("../../validators/sectors/resourceValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
} = require("../../controllers/sectors/resourceController");

/* ===========================
   RESOURCE CRUD
=========================== */

router.post("/", authenticateToken, validateCreateResource, createResource);

router.get("/", getAllResources);

router.get("/:id", getResourceById);

router.put("/:id", authenticateToken, validateUpdateResource, updateResource);

router.delete("/:id", authenticateToken, deleteResource);

module.exports = router;