// controllers/regionalOfficeController.js
"use strict";

const {
  Region,
  RegionalOfficeContactCenter,
  LicensingContact,
  sequelize,
} = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE REGIONAL OFFICE (WITH LICENSING CONTACTS)
// ===========================
const createRegionalOffice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      region_id,
      bureau_name,
      address,
      director,
      email,
      phone,
      licensing_contacts, // optional array [{name, email, phone}, ...]
    } = req.body;

    if (!region_id || !bureau_name) {
      await t.rollback();
      return res
        .status(400)
        .json({
          success: false,
          message: "Region and bureau name are required.",
        });
    }

    // Validate region exists
    const region = await Region.findByPk(region_id);
    if (!region) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Region not found." });
    }

    // Create Regional Office
    const regionalOffice = await RegionalOfficeContactCenter.create(
      {
        regional_office_id: uuidv4(),
        region_id,
        bureau_name,
        address,
        director,
        email,
        phone,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    // If licensing contacts provided, create them
    if (Array.isArray(licensing_contacts) && licensing_contacts.length > 0) {
      for (const contact of licensing_contacts) {
        const { name, email, phone } = contact;
        if (!name) continue; // skip invalid

        await LicensingContact.create(
          {
            licensing_contact_id: uuidv4(),
            regional_office_id: regionalOffice.regional_office_id,
            name,
            email,
            phone,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: t },
        );
      }
    }

    await t.commit();

    // Fetch the office with its licensing contacts
    const createdOffice = await RegionalOfficeContactCenter.findByPk(
      regionalOffice.regional_office_id,
      {
        include: [{ model: LicensingContact, as: "licensing_contacts" }],
      },
    );

    return res.status(201).json({
      success: true,
      message: "Regional office created successfully",
      data: createdOffice,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Create Regional Office Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create regional office",
      error: error.message,
    });
  }
};

// ===========================
// GET ALL REGIONAL OFFICES
// ===========================
const getAllRegionalOffices = async (req, res) => {
  try {
    const offices = await RegionalOfficeContactCenter.findAll({
      include: [{ model: LicensingContact, as: "licensing_contacts" }],
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Regional offices fetched successfully",
      count: offices.length,
      data: offices,
    });
  } catch (error) {
    console.error("Fetch Regional Offices Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch regional offices",
      error: error.message,
    });
  }
};

// ===========================
// GET REGIONAL OFFICE BY ID
// ===========================
const getRegionalOfficeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid office ID." });

    const office = await RegionalOfficeContactCenter.findByPk(id, {
      include: [{ model: LicensingContact, as: "licensing_contacts" }],
    });

    if (!office)
      return res
        .status(404)
        .json({ success: false, message: "Regional office not found." });

    return res.status(200).json({
      success: true,
      message: "Regional office fetched successfully",
      data: office,
    });
  } catch (error) {
    console.error("Get Regional Office Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch regional office",
      error: error.message,
    });
  }
};

// ===========================
// UPDATE REGIONAL OFFICE
// ===========================
const updateRegionalOffice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      region_id,
      bureau_name,
      address,
      director,
      email,
      phone,
      licensing_contacts, // optional: replace existing contacts
    } = req.body;

    const office = await RegionalOfficeContactCenter.findByPk(id, {
      transaction: t,
    });
    if (!office) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Regional office not found." });
    }

    // Update main office
    await office.update(
      {
        region_id,
        bureau_name,
        address,
        director,
        email,
        phone,
        updated_at: new Date(),
      },
      { transaction: t },
    );

    // If licensing contacts provided, replace existing
    if (Array.isArray(licensing_contacts)) {
      // Delete existing
      await LicensingContact.destroy({
        where: { regional_office_id: id },
        transaction: t,
      });

      // Add new
      for (const contact of licensing_contacts) {
        const { name, email, phone } = contact;
        if (!name) continue;

        await LicensingContact.create(
          {
            licensing_contact_id: uuidv4(),
            regional_office_id: id,
            name,
            email,
            phone,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: t },
        );
      }
    }

    await t.commit();

    const updatedOffice = await RegionalOfficeContactCenter.findByPk(id, {
      include: [{ model: LicensingContact, as: "licensing_contacts" }],
    });

    return res.status(200).json({
      success: true,
      message: "Regional office updated successfully",
      data: updatedOffice,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Update Regional Office Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update regional office",
      error: error.message,
    });
  }
};

// ===========================
// DELETE REGIONAL OFFICE (soft delete)
// ===========================
const deleteRegionalOffice = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const office = await RegionalOfficeContactCenter.findByPk(id, {
      transaction: t,
    });
    if (!office) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Regional office not found." });
    }

    await office.update({ deleted_at: new Date() }, { transaction: t });
    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Regional office deleted successfully (soft delete)",
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Delete Regional Office Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete regional office",
      error: error.message,
    });
  }
};

module.exports = {
  createRegionalOffice,
  getAllRegionalOffices,
  getRegionalOfficeById,
  updateRegionalOffice,
  deleteRegionalOffice,
};
