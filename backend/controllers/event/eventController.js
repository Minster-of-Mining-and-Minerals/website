"use strict";
const {
  Event,
  EventAttachment,
  EventCategory,
  Attachment,
  sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");
const { getRelatedEvents } = require("../../utils/relatedEvents");

// ============================================
// HELPER: AUTO STATUS LOGIC
// ============================================
const resolveEventStatus = (event) => {
  const now = new Date();

  // Explicit overrides
  if (event.status === "cancelled") return "cancelled";
  if (event.status === "archived") return "archived";

  // Event Progress based on start/end time
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  if (now < startTime) {
    return "upcoming";
  }

  if (now >= startTime && now <= endTime) {
    return "ongoing";
  }

  if (now > endTime) {
    return "completed";
  }

  return event.status;
};

// ============================================
// CREATE EVENT
// ============================================
const createEvent = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      title,
      description,
      start_time,
      end_time,
      location,
      virtual_link,
      organizer,
      content,
      attachments,
      event_category_id,
      publish_start,
      publish_end,
      status,
    } = req.body;

    if (!title || !start_time || !end_time) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Title, start_time and end_time are required",
      });
    }

    const event = await Event.create(
      {
        event_id: uuidv4(),
        title,
        description,
        event_category_id,
        start_time,
        end_time,
        location,
        virtual_link,
        organizer,
        content,
        publish_start,
        publish_end,
        status: status || "draft",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    // ================= ATTACHMENTS =================
    if (Array.isArray(attachments)) {
      const rows = attachments.map((attachment_id) => ({
        event_attachment_id: uuidv4(),
        event_id: event.event_id,
        attachment_id,
        created_at: new Date(),
      }));

      await EventAttachment.bulkCreate(rows, { transaction: t });
    }

    // Categories (removed junction logic)


    await t.commit();
    
    // Reload with associations
    const fullEvent = await Event.findByPk(event.event_id, {
      include: [
        {
          model: EventCategory,
          as: "category",
        },
        {
          model: EventAttachment,
          as: "attachments",
          include: [{ model: Attachment, as: "attachment" }],
        },
      ],
    });

    const computed_status = resolveEventStatus(fullEvent);

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: { ...fullEvent.toJSON(), computed_status },
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// ============================================
// GET ALL EVENTS
// ============================================
const getAllEvents = async (req, res) => {
  try {
    const { status, isAdmin, search } = req.query;

    const where = { deleted_at: null };

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (isAdmin !== "true") {
      // Public Side: Only 'published' events within the live window
      // publish_start can be null (immediate publish) or in the past
      where.status = "published";
      where[Op.and] = [
        {
          [Op.or]: [
            { publish_start: null },
            { publish_start: { [Op.lte]: new Date() } }
          ]
        },
        {
          [Op.or]: [
            { publish_end: null },
            { publish_end: { [Op.gte]: new Date() } }
          ]
        }
      ];
    } else if (status) {
      where.status = status;
    }

    const events = await Event.findAll({
      where,
      include: [
        {
          model: EventAttachment,
          as: "attachments",
          include: [{ model: Attachment, as: "attachment" }],
        },
        {
          model: EventCategory,
          as: "category",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // 🔥 Apply dynamic status update
    const updatedEvents = events.map((event) => {
      const newStatus = resolveEventStatus(event);
      return { ...event.toJSON(), computed_status: newStatus };
    });

    return res.status(200).json({
      success: true,
      count: updatedEvents.length,
      data: updatedEvents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// ============================================
// GET EVENT BY ID
// ============================================
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const event = await Event.findByPk(id, {
      include: [
        {
          model: EventAttachment,
          as: "attachments",
          include: [{ model: Attachment, as: "attachment" }],
        },
        {
          model: EventCategory,
          as: "category",
        },
      ],
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const computed_status = resolveEventStatus(event);
    const relatedEvents = await getRelatedEvents(id, 10);

    return res.status(200).json({
      success: true,
      data: { ...event.toJSON(), computed_status, relatedEvents },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// ============================================
// UPDATE EVENT
// ============================================
const updateEvent = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, { transaction: t });
    if (!event) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const updateData = {
      ...req.body,
      updated_at: new Date(),
    };

    // auto set published_at
    if (req.body.status === "published" && !event.published_at) {
      updateData.published_at = new Date();
    }

    await event.update(updateData, { transaction: t });

    // ===== attachments =====
    const finalAttachmentIds = req.body.attachment_ids || req.body.attachments;
    if (Array.isArray(finalAttachmentIds)) {
      await EventAttachment.destroy({
        where: { event_id: id },
        transaction: t,
      });

      const rows = finalAttachmentIds.map((attachment_id) => ({
        event_attachment_id: uuidv4(),
        event_id: id,
        attachment_id,
      }));

      await EventAttachment.bulkCreate(rows, { transaction: t });
    }

    // Category updated directly in updateData if event_category_id is in body


    await t.commit();

    // Reload with associations
    const fullEvent = await Event.findByPk(id, {
      include: [
        {
          model: EventCategory,
          as: "category",
        },
        {
          model: EventAttachment,
          as: "attachments",
          include: [{ model: Attachment, as: "attachment" }],
        },
      ],
    });

    const computed_status = resolveEventStatus(fullEvent);

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: { ...fullEvent.toJSON(), computed_status },
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    return res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// ============================================
// DELETE EVENT (SOFT)
// ============================================
const deleteEvent = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, { transaction: t });
    if (!event) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    await event.update({ deleted_at: new Date() }, { transaction: t });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

// ============================================
// APPROVE EVENT
// ============================================
const approveEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    await event.update({
      approved_by: req.user?.id || null,
      approved_at: new Date(),
      status: "scheduled",
    });

    return res.status(200).json({
      success: true,
      message: "Event approved and scheduled",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to approve event",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveEvent,
};
