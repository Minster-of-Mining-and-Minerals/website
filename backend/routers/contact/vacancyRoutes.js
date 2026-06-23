"use strict";

const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  checkPermission,
} = require("../../middlewares/authMiddleware");

const {
  validateCreateVacancy,
  validateUpdateVacancy,
} = require("../../validators/contact/vacancyValidator");

const {
  createVacancy,
  getAllVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
  publishVacancy,
  unpublishVacancy,
  closeVacancy,
} = require("../../controllers/contact/vacancyController");

router.post(
  "/",
  authenticateToken,
  checkPermission("vacancies", "create"),
  validateCreateVacancy,
  createVacancy,
);
router.get("/", getAllVacancies);
router.get("/:id", getVacancyById);
router.put(
  "/:id",
  authenticateToken,
  checkPermission("vacancies", "update"),
  validateUpdateVacancy,
  updateVacancy,
);
router.delete(
  "/:id",
  authenticateToken,
  checkPermission("vacancies", "delete"),
  deleteVacancy,
);
router.patch(
  "/:id/publish",
  authenticateToken,
  checkPermission("vacancies", "publish"),
  publishVacancy,
);
router.patch(
  "/:id/unpublish",
  authenticateToken,
  checkPermission("vacancies", "publish"),
  unpublishVacancy,
);
router.patch(
  "/:id/close",
  authenticateToken,
  checkPermission("vacancies", "update"),
  closeVacancy,
);

module.exports = router;
