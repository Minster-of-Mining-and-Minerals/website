"use strict";

const { EventCategory, sequelize } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

// ============================================
// CREATE STANDALONE CATEGORY  (like createTag)
// ============================================
const createEventCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const existing = await EventCategory.findOne({ where: { name: name.trim() } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const category = await EventCategory.create({
      event_category_id: uuidv4(),
      name: name.trim(),
    });

    return res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create category", error: error.message });
  }
};

// ============================================
// GET ALL STANDALONE CATEGORIES
// ============================================
const getAllEventCategories = async (req, res) => {
  try {
    const categories = await EventCategory.findAll({ order: [["name", "ASC"]] });
    return res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch categories", error: error.message });
  }
};

// ============================================
// UPDATE CATEGORY NAME
// ============================================
const updateEventCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await EventCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    await category.update({ name: name.trim() });
    return res.status(200).json({ success: true, message: "Category updated", data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update category", error: error.message });
  }
};

// ============================================
// DELETE STANDALONE CATEGORY
// ============================================
const deleteEventCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await EventCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    await category.destroy();
    return res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete category", error: error.message });
  }
};

module.exports = {
  createEventCategory,
  getAllEventCategories,
  updateEventCategory,
  deleteEventCategory,
};