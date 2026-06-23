"use strict";

const { Vacancy, Attachment, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");
const {
  withDisplayStatus,
  isAllowedVacancyAttachment,
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
    !isAllowedVacancyAttachment(attachment.mime_type, attachment.file_name)
  ) {
    res.status(400).json({
      success: false,
      message: "Only PDF files are allowed for vacancy attachments.",
    });
    return false;
  }
  return true;
}

const createVacancy = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      job_title,
      department,
      location,
      employment_type,
      positions,
      description,
      requirements,
      published_date,
      application_deadline,
      attachment_id,
      status,
    } = req.body;

    if (!(await validateAttachment(attachment_id, res))) {
      await t.rollback();
      return;
    }

    const vacancy = await Vacancy.create(
      {
        vacancy_id: uuidv4(),
        job_title,
        department: department || null,
        location: location || null,
        employment_type: employment_type || "full_time",
        positions: positions ?? null,
        description,
        requirements: requirements || null,
        published_date,
        application_deadline,
        attachment_id: attachment_id || null,
        status: status || "draft",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    const full = await Vacancy.findByPk(vacancy.vacancy_id, {
      include: [attachmentInclude],
    });

    return res.status(201).json({
      success: true,
      message: "Vacancy created successfully",
      data: withDisplayStatus(full, "application_deadline"),
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to create vacancy",
      error: error.message,
    });
  }
};

const getAllVacancies = async (req, res) => {
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
        { job_title: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const vacancies = await Vacancy.findAll({
      where,
      include: [attachmentInclude],
      order: [
        ["published_date", "DESC"],
        ["created_at", "DESC"],
      ],
    });

    const data = vacancies.map((item) =>
      withDisplayStatus(item, "application_deadline"),
    );

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vacancies",
      error: error.message,
    });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAdmin } = req.query;

    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vacancy ID." });
    }

    const vacancy = await Vacancy.findOne({
      where: { vacancy_id: id, deleted_at: null },
      include: [attachmentInclude],
    });

    if (!vacancy) {
      return res.status(404).json({ success: false, message: "Vacancy not found." });
    }

    if (isAdmin !== "true" && vacancy.status === "draft") {
      return res.status(404).json({ success: false, message: "Vacancy not found." });
    }

    return res.status(200).json({
      success: true,
      data: withDisplayStatus(vacancy, "application_deadline"),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vacancy",
      error: error.message,
    });
  }
};

const updateVacancy = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: "Invalid vacancy ID." });
    }

    const vacancy = await Vacancy.findOne({
      where: { vacancy_id: id, deleted_at: null },
      transaction: t,
    });

    if (!vacancy) {
      await t.rollback();
      return res.status(404).json({ success: false, message: "Vacancy not found." });
    }

    const payload = { ...req.body, updated_at: new Date() };

    if (payload.attachment_id !== undefined) {
      if (!(await validateAttachment(payload.attachment_id, res))) {
        await t.rollback();
        return;
      }
    }

    const publishedDate = payload.published_date || vacancy.published_date;
    const deadline =
      payload.application_deadline || vacancy.application_deadline;
    if (new Date(deadline) < new Date(publishedDate)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Application deadline cannot be earlier than published date.",
      });
    }

    await vacancy.update(payload, { transaction: t });
    await t.commit();

    const full = await Vacancy.findByPk(id, { include: [attachmentInclude] });

    return res.status(200).json({
      success: true,
      message: "Vacancy updated successfully",
      data: withDisplayStatus(full, "application_deadline"),
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Failed to update vacancy",
      error: error.message,
    });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vacancy ID." });
    }

    const vacancy = await Vacancy.findOne({
      where: { vacancy_id: id, deleted_at: null },
    });

    if (!vacancy) {
      return res.status(404).json({ success: false, message: "Vacancy not found." });
    }

    await vacancy.update({ deleted_at: new Date(), updated_at: new Date() });

    return res.status(200).json({
      success: true,
      message: "Vacancy deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete vacancy",
      error: error.message,
    });
  }
};

const updateVacancyStatus = async (req, res, status) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid vacancy ID." });
    }

    const vacancy = await Vacancy.findOne({
      where: { vacancy_id: id, deleted_at: null },
    });

    if (!vacancy) {
      return res.status(404).json({ success: false, message: "Vacancy not found." });
    }

    await vacancy.update({ status, updated_at: new Date() });

    const full = await Vacancy.findByPk(id, { include: [attachmentInclude] });

    return res.status(200).json({
      success: true,
      message: `Vacancy ${status} successfully`,
      data: withDisplayStatus(full, "application_deadline"),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update vacancy status",
      error: error.message,
    });
  }
};

const publishVacancy = (req, res) => updateVacancyStatus(req, res, "published");
const unpublishVacancy = (req, res) => updateVacancyStatus(req, res, "draft");
const closeVacancy = (req, res) => updateVacancyStatus(req, res, "closed");

module.exports = {
  createVacancy,
  getAllVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
  publishVacancy,
  unpublishVacancy,
  closeVacancy,
};
