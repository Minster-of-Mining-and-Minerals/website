// controllers/regionController.js
"use strict";
const {
  Region,
  RegionalOfficeContactCenter,
  sequelize,
} = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE REGION
// ===========================
const createRegion = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { code, name } = req.body;

    if (!code || !name) {
      await t.rollback();
      return res
        .status(400)
        .json({ success: false, message: "Code and name are required." });
    }

    const region = await Region.create(
      {
        region_id: uuidv4(),
        code,
        name,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();
    return res
      .status(201)
      .json({
        success: true,
        message: "Region created successfully",
        data: region,
      });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Create Region Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to create region",
        error: error.message,
      });
  }
};

// ===========================
// GET ALL REGIONS
// ===========================
const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll({
      include: [{ model: RegionalOfficeContactCenter, as: "regional_offices" }],
      order: [["created_at", "DESC"]],
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Regions fetched successfully",
        count: regions.length,
        data: regions,
      });
  } catch (error) {
    console.error("Fetch Regions Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch regions",
        error: error.message,
      });
  }
};

// ===========================
// GET REGION BY ID
// ===========================
const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid region ID." });

    const region = await Region.findByPk(id, {
      include: [{ model: RegionalOfficeContactCenter, as: "regional_offices" }],
    });
    if (!region)
      return res
        .status(404)
        .json({ success: false, message: "Region not found." });

    return res
      .status(200)
      .json({
        success: true,
        message: "Region fetched successfully",
        data: region,
      });
  } catch (error) {
    console.error("Get Region Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch region",
        error: error.message,
      });
  }
};

// ===========================
// UPDATE REGION
// ===========================
const updateRegion = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { code, name } = req.body;

    const region = await Region.findByPk(id, { transaction: t });
    if (!region) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Region not found." });
    }

    await region.update(
      { code, name, updated_at: new Date() },
      { transaction: t },
    );
    await t.commit();

    return res
      .status(200)
      .json({
        success: true,
        message: "Region updated successfully",
        data: region,
      });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Update Region Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to update region",
        error: error.message,
      });
  }
};

// ===========================
// DELETE REGION (soft delete)
// ===========================
const deleteRegion = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const region = await Region.findByPk(id, { transaction: t });
    if (!region) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Region not found." });
    }

    await region.update({ deleted_at: new Date() }, { transaction: t });
    await t.commit();

    return res
      .status(200)
      .json({
        success: true,
        message: "Region deleted successfully (soft delete)",
      });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Delete Region Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete region",
        error: error.message,
      });
  }
};

module.exports = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
};
