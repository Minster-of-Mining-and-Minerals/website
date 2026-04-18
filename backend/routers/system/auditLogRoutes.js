const express = require("express");
const router = express.Router();
const auditLogController = require("../../controllers/system/auditLogController");
const { authenticateToken, checkPermission } = require("../../middlewares/authMiddleware");

// Retrieve all audit logs (Requires read permission)
router.get(
  "/",
  authenticateToken,
  checkPermission("audit_logs", "read"),
  auditLogController.getAuditLogs
);

// Delete an audit log entry (Usually reserved for superadmins, careful here)
router.delete(
  "/:id",
  authenticateToken,
  checkPermission("audit_logs", "delete"),
  auditLogController.deleteAuditLog
);

module.exports = router;
