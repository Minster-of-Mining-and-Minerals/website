// controllers/federalOfficeController.js
"use strict";
const { FederalOfficeContact, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE FEDERAL OFFICE
// ===========================
const createFederalOffice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { office_address, phone, email, map_location } = req.body;

    if (!office_address) {
      await t.rollback();
      return res
        .status(400)
        .json({ success: false, message: "Office address is required." });
    }

    const office = await FederalOfficeContact.create(
      {
        federal_office_id: uuidv4(),
        office_address,
        phone,
        email,
        map_location,
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
        message: "Federal office created successfully",
        data: office,
      });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Create Federal Office Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to create federal office",
        error: error.message,
      });
  }
};

// ===========================
// GET ALL FEDERAL OFFICES
// ===========================
const getAllFederalOffices = async (req, res) => {
  try {
    const offices = await FederalOfficeContact.findAll({
      order: [["created_at", "DESC"]],
    });
    return res
      .status(200)
      .json({
        success: true,
        message: "Federal offices fetched successfully",
        count: offices.length,
        data: offices,
      });
  } catch (error) {
    console.error("Fetch Federal Offices Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch federal offices",
        error: error.message,
      });
  }
};

// ===========================
// GET FEDERAL OFFICE BY ID
// ===========================
const getFederalOfficeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid federal office ID." });

    const office = await FederalOfficeContact.findByPk(id);
    if (!office)
      return res
        .status(404)
        .json({ success: false, message: "Federal office not found." });

    return res
      .status(200)
      .json({
        success: true,
        message: "Federal office fetched successfully",
        data: office,
      });
  } catch (error) {
    console.error("Get Federal Office Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch federal office",
        error: error.message,
      });
  }
};

// ===========================
// UPDATE FEDERAL OFFICE
// ===========================
const updateFederalOffice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { office_address, phone, email, map_location } = req.body;

    const office = await FederalOfficeContact.findByPk(id, { transaction: t });
    if (!office) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Federal office not found." });
    }

    await office.update(
      { office_address, phone, email, map_location, updated_at: new Date() },
      { transaction: t },
    );
    await t.commit();

    return res
      .status(200)
      .json({
        success: true,
        message: "Federal office updated successfully",
        data: office,
      });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Update Federal Office Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to update federal office",
        error: error.message,
      });
  }
};

// ===========================
// DELETE FEDERAL OFFICE (soft delete)
// ===========================
const deleteFederalOffice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const office = await FederalOfficeContact.findByPk(id, { transaction: t });
    if (!office) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Federal office not found." });
    }

    await office.update({ deleted_at: new Date() }, { transaction: t });
    await t.commit();

    return res
      .status(200)
      .json({
        success: true,
        message: "Federal office deleted successfully (soft delete)",
      });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Delete Federal Office Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete federal office",
        error: error.message,
      });
  }
};

module.exports = {
  createFederalOffice,
  getAllFederalOffices,
  getFederalOfficeById,
  updateFederalOffice,
  deleteFederalOffice,
};
