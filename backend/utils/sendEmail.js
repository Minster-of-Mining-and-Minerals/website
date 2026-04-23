const nodemailer = require("nodemailer");
const logger = require("./logger"); // your custom logger
const dns = require("dns");

// Force use of Google DNS if system DNS is failing
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.warn("Failed to set custom DNS servers:", e.message);
}

const sendEmail = async (to, subject, text) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
      secure: process.env.EMAIL_SECURE === "true", // true for port 465, false for others (like 587)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define mail options
    const mailOptions = {
      from: `"${process.env.APP_NAME || "Notification System"}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log success
    logger.info(`Email sent to ${to} | Subject: ${subject}`);
  } catch (error) {
    // Log error
    logger.error(`Failed to send email to ${to} | Subject: ${subject} | Error: ${error.message}`);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { sendEmail };
