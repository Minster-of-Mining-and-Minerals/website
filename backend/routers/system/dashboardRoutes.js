const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/system/dashboardController");
const { authenticateToken, checkPermission } = require("../../middlewares/authMiddleware");

// Retrieve dashboard analytics (Requires dashboard view permission)
router.get(
  "/",
  authenticateToken,
  checkPermission("dashboard", "view"),
  dashboardController.getDashboardAnalytics
);

module.exports = router;
