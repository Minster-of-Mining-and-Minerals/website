const express = require("express");
const router = express.Router();
const authController = require("../../controllers/user/authController");
const { 
  validateLogin, 
  validateRequestOTP, 
  validateVerifyOTP, 
  validateResetPassword 
} = require("../../validators/user/authValidator");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateLogin, authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authController.logout);
router.post("/request-otp", validateRequestOTP, authController.requestOTP);
router.post("/verify-otp", validateVerifyOTP, authController.verifyOTP);
router.post("/reset-password", validateResetPassword, authController.resetPassword);

module.exports = router;
