"use strict";

const { FooterSection, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE FOOTER SECTION
// ===========================
const createFooterSection = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { footer_id, section_name, links } = req.body;

    if (!footer_id || !section_name) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "footer_id and section_name are required.",
      });
    }

    const section = await FooterSection.create(
      {
        footer_section_id: uuidv4(),
        footer_id,
        section_name,
        links: links || [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Footer section created successfully",
      data: section,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("Create Footer Section Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create footer section",
      error: error.message,
    });
  }
};

// ===========================
// GET ALL SECTIONS FOR A FOOTER
// ===========================
const getSectionsByFooterId = async (req, res) => {
  try {
    const { footer_id } = req.params;

    const sections = await FooterSection.findAll({
      where: { footer_id },
      order: [["created_at", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Footer sections fetched successfully",
      count: sections.length,
      data: sections,
    });
  } catch (error) {
    console.error("Get Footer Sections Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch footer sections",
      error: error.message,
    });
  }
};

module.exports = {
  createFooterSection,
  getSectionsByFooterId,
};
