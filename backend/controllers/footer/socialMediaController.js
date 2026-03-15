"use strict";
const { SocialMedia, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE SOCIAL MEDIA
// ===========================
const createSocialMedia = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { platform_name, icon, url } = req.body;

    if (!platform_name || !icon || !url) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Platform name, icon and url are required.",
      });
    }

    const socialMedia = await SocialMedia.create(
      {
        social_media_id: uuidv4(),
        platform_name,
        icon,
        url,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Social media created successfully",
      data: socialMedia,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Create Social Media Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create social media",
      error: error.message,
    });
  }
};

// ===========================
// GET ALL SOCIAL MEDIAS
// ===========================
const getAllSocialMedias = async (req, res) => {
  try {
    const socialMedias = await SocialMedia.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Social medias fetched successfully",
      count: socialMedias.length,
      data: socialMedias,
    });
  } catch (error) {
    console.error("Fetch Social Medias Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch social medias",
      error: error.message,
    });
  }
};

// ===========================
// GET SOCIAL MEDIA BY ID
// ===========================
const getSocialMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid social media ID." });

    const socialMedia = await SocialMedia.findByPk(id);

    if (!socialMedia)
      return res
        .status(404)
        .json({ success: false, message: "Social media not found." });

    return res.status(200).json({
      success: true,
      message: "Social media fetched successfully",
      data: socialMedia,
    });
  } catch (error) {
    console.error("Get Social Media Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch social media",
      error: error.message,
    });
  }
};

// ===========================
// UPDATE SOCIAL MEDIA
// ===========================
const updateSocialMedia = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { platform_name, icon, url } = req.body;

    const socialMedia = await SocialMedia.findByPk(id, { transaction: t });

    if (!socialMedia) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Social media not found." });
    }

    await socialMedia.update(
      {
        platform_name,
        icon,
        url,
        updated_at: new Date(),
      },
      { transaction: t },
    );

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Social media updated successfully",
      data: socialMedia,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Update Social Media Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update social media",
      error: error.message,
    });
  }
};

// ===========================
// DELETE SOCIAL MEDIA (soft delete)
// ===========================
const deleteSocialMedia = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const socialMedia = await SocialMedia.findByPk(id, { transaction: t });

    if (!socialMedia) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, message: "Social media not found." });
    }

    await socialMedia.update({ deleted_at: new Date() }, { transaction: t });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Social media deleted successfully (soft delete)",
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Delete Social Media Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete social media",
      error: error.message,
    });
  }
};

module.exports = {
  createSocialMedia,
  getAllSocialMedias,
  getSocialMediaById,
  updateSocialMedia,
  deleteSocialMedia,
};
