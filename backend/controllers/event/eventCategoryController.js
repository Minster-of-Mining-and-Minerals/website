"use strict";

const { EventCategory, Event, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");


// ============================================
// CREATE CATEGORY (single or bulk)
// ============================================
const createEventCategory = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { event_id, categories } = req.body;

    if (!isUuid(event_id)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid event_id",
      });
    }

    const event = await Event.findByPk(event_id);
    if (!event) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Categories must be a non-empty array",
      });
    }

    const rows = categories.map((category) => ({
      event_category_id: uuidv4(),
      event_id,
      category,
    }));

    const created = await EventCategory.bulkCreate(rows, { transaction: t });

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Categories created successfully",
      data: created,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    return res.status(500).json({
      success: false,
      message: "Failed to create categories",
      error: error.message,
    });
  }
};


// ============================================
// GET ALL CATEGORIES
// ============================================
const getAllEventCategories = async (req, res) => {
  try {
    const categories = await EventCategory.findAll({
      include: [
        {
          model: Event,
          as: "event",
          attributes: ["event_id", "title"],
        },
      ],
      order: [["category", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};


// ============================================
// GET CATEGORIES BY EVENT
// ============================================
const getCategoriesByEvent = async (req, res) => {
  try {
    const { event_id } = req.params;

    if (!isUuid(event_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event_id",
      });
    }

    const categories = await EventCategory.findAll({
      where: { event_id },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event categories",
      error: error.message,
    });
  }
};


// ============================================
// UPDATE CATEGORY
// ============================================
const updateEventCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    const eventCategory = await EventCategory.findByPk(id);

    if (!eventCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await eventCategory.update({ category });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: eventCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};


// ============================================
// DELETE CATEGORY
// ============================================
const deleteEventCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const eventCategory = await EventCategory.findByPk(id);

    if (!eventCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await eventCategory.destroy();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};



module.exports = {
  createEventCategory,
  getAllEventCategories,
  getCategoriesByEvent,
  updateEventCategory,
  deleteEventCategory,
};