require("dotenv").config();
const { sendEmail } = require("./utils/sendEmail");

(async () => {
  try {
    console.log("Testing email configuration...");

    await sendEmail(
      process.env.EMAIL_USER,
      "MoM",
      "This email is from MoM Website."
    );

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email test failed:", error.message);
  }
})();
