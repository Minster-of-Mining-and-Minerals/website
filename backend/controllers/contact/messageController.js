// controllers/messageController.js
"use strict";
const { Message, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE MESSAGE
// ===========================
const createMessage = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { full_name, email_address, subject, message } = req.body;

    if (!full_name || !email_address || !subject || !message) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Full name, email address, subject, and message are required.",
      });
    }

    const newMessage = await Message.create(
      {
        message_id: uuidv4(),
        full_name,
        email_address,
        subject,
        message,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Create Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// ===========================
// GET ALL MESSAGES
// ===========================
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Fetch Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
};

// ===========================
// GET MESSAGE BY ID
// ===========================
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message fetched successfully",
      data: message,
    });
  } catch (error) {
    console.error("Get Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch message",
      error: error.message,
    });
  }
};

// ===========================
// DELETE MESSAGE (soft delete)
// ===========================
const deleteMessage = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id, { transaction: t });

    if (!message) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    await message.update({ deleted_at: new Date() }, { transaction: t });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully (soft delete)",
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Delete Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
};
