"use strict";

const { Tender, Attachment, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");
const {
  withDisplayStatus,
  isAllowedTenderAttachment,
} = require("../../utils/tenderVacancyStatus");

const attachmentInclude = {
  model: Attachment,
  as: "attachment",
  required: false,
};

async function validateAttachment(attachmentId, res) {
  if (!attachmentId) return true;
  if (!isUuid(attachmentId)) {
    res.status(400).json({ success: false, message: "Invalid attachment ID." });
    return false;
  }
  const attachment = await Attachment.findByPk(attachmentId);
  if (!attachment) {
    res.status(400).json({ success: false, message: "Attachment not found." });
    return false;
  }
  if (
    !isAllowedTenderAttachment(attachment.mime_type, attachment.file_name)
  ) {
    res.status(400).json({
      success: false,
      message: "Only PDF and document files are allowed for tender attachments.",
    });
    return false;
  }
  return true;
}

const createTender = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      title,
      reference_number,
      description,
      published_date,
      closing_date,
      attachment_id,
      status,
    } = req.body;

    if (!(await validateAttachment(attachment_id, res))) {
      await t.rollback();
      return;
    }

    const tender = await Tender.create(
      {
        tender_id: uuidv4(),
        title,
        reference_number: reference_number || null,
        description,
        published_date,
        closing_date,
        attachment_id: attachment_id || null,
        status: status || "draft",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    const full = await Tender.findByPk(tender.tender_id, {
      include: [attachmentInclude],
    });

    return res.status(201).json({
      success: true,
      message: "Tender created successfully",
      data: withDisplayStatus(full, "closing_date"),
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to create tender",
      error: error.message,
    });
  }
};

const getAllTenders = async (req, res) => {
  try {
    const { search, status, isAdmin } = req.query;
    const where = { deleted_at: null };

    if (isAdmin !== "true") {
      where.status = "published";
    } else if (status) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { reference_number: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const tenders = await Tender.findAll({
      where,
      include: [attachmentInclude],
      order: [
        ["published_date", "DESC"],
        ["created_at", "DESC"],
      ],
    });

    const data = tenders.map((item) =>
      withDisplayStatus(item, "closing_date"),
    );

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tenders",
      error: error.message,
    });
  }
};

const getTenderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.query;

    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid tender ID." });
    }

    const tender = await Tender.findOne({
      where: { tender_id: id, deleted_at: null },
      include: [attachmentInclude],
    });

    if (!tender) {
      return res.status(404).json({ success: false, message: "Tender not found." });
    }

    if (isAdmin !== "true" && tender.status === "draft") {
      return res.status(404).json({ success: false, message: "Tender not found." });
    }

    return res.status(200).json({
      success: true,
      data: withDisplayStatus(tender, "closing_date"),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tender",
      error: error.message,
    });
  }
};

const updateTender = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: "Invalid tender ID." });
    }

    const tender = await Tender.findOne({
      where: { tender_id: id, deleted_at: null },
      transaction: t,
    });

    if (!tender) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "Tender not found." });
    }

    const payload = { ...req.body, updated_at: new Date() };

    if (payload.attachment_id !== undefined) {
      if (!(await validateAttachment(payload.attachment_id, res))) {
        await t.rollback();
        return;
      }
    }

    const publishedDate = payload.published_date || tender.published_date;
    const closingDate = payload.closing_date || tender.closing_date;
    if (new Date(closingDate) < new Date(publishedDate)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Closing date cannot be earlier than published date.",
      });
    }

    await tender.update(payload, { transaction: t });
    await t.commit();

    const full = await Tender.findByPk(id, { include: [attachmentInclude] });

    return res.status(200).json({
      success: true,
      message: "Tender updated successfully",
      data: withDisplayStatus(full, "closing_date"),
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to update tender",
      error: error.message,
    });
  }
};

const deleteTender = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid tender ID." });
    }

    const tender = await Tender.findOne({
      where: { tender_id: id, deleted_at: null },
    });

    if (!tender) {
      return res.status(404).json({ success: false, message: "Tender not found." });
    }

    await tender.update({ deleted_at: new Date(), updated_at: new Date() });

    return res.status(200).json({
      success: true,
      message: "Tender deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete tender",
      error: error.message,
    });
  }
};

const updateTenderStatus = async (req, res, status) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid tender ID." });
    }

    const tender = await Tender.findOne({
      where: { tender_id: id, deleted_at: null },
    });

    if (!tender) {
      return res.status(404).json({ success: false, message: "Tender not found." });
    }

    await tender.update({ status, updated_at: new Date() });

    const full = await Tender.findByPk(id, { include: [attachmentInclude] });

    return res.status(200).json({
      success: true,
      message: `Tender ${status} successfully`,
      data: withDisplayStatus(full, "closing_date"),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update tender status",
      error: error.message,
    });
  }
};

const publishTender = (req, res) => updateTenderStatus(req, res, "published");
const unpublishTender = (req, res) => updateTenderStatus(req, res, "draft");
const closeTender = (req, res) => updateTenderStatus(req, res, "closed");

module.exports = {
  createTender,
  getAllTenders,
  getTenderById,
  updateTender,
  deleteTender,
  publishTender,
  unpublishTender,
  closeTender,
};
