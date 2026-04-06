const express = require("express");
const router = express.Router();

const {
    validateCreateASM,
    validateUpdateASM,
} = require("../../validators/asm/asmValidator");

const { authenticateToken } = require("../../middlewares/authMiddleware");

const {
    createASM,
    getAllASM,
    getASMById,
    updateASM,
    deleteASM,
} = require("../../controllers/asm/asmController");

/* ===========================
   ASM CRUD
=========================== */

router.post("/", authenticateToken, validateCreateASM, createASM);

router.get("/", getAllASM);

router.get("/:id", getASMById);

router.put("/:id", authenticateToken, validateUpdateASM, updateASM);

router.delete("/:id", authenticateToken, deleteASM);

module.exports = router;