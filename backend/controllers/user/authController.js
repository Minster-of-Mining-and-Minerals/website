const { User, Role, RolePermission, Permission } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/sendEmail");
const { Op } = require("sequelize");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    if (!user.is_active)
      return res.status(403).json({ message: "User is inactive" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // ===== Generate JWT Token (Lightweight) =====
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        name: user.full_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Update last login
    await User.update(
      { last_login_at: new Date() },
      { where: { user_id: user.user_id } }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          phone_number: user.phone_number,
          profile_image: user.profile_image,
          is_first_logged_in: user.is_first_logged_in,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Logout (token invalidation example using a blacklist)
const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email, is_active: true } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.update({
      reset_password_otp: otp,
      reset_password_otp_expires: expiry,
    });

    // Send email
    const subject = "Password Reset OTP";
    const text = `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`;
    await sendEmail(email, subject, text);

    res.status(200).json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      where: {
        email,
        reset_password_otp: otp,
        reset_password_otp_expires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      where: {
        email,
        reset_password_otp: otp,
        reset_password_otp_expires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      reset_password_otp: null,
      reset_password_otp_expires: null,
      is_first_logged_in: false,
      password_changed_at: new Date(),
      updated_at: new Date(),
    });

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Failed to reset password", error: error.message });
  }
};

module.exports = { login, logout, requestOTP, verifyOTP, resetPassword };
