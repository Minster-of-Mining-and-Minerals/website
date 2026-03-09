"use strict";

const {
  Strategy,
  StrategySection,
  Attachment,
  CoreValue,
  sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");

// ============================================
// Helper: Prepare Sections + CoreValues
// ============================================

const prepareStrategyData = (sections = [], strategyId) => {
  const sectionRows = [];
  const coreValueRows = [];

  sections.forEach((sec) => {
    const sectionId = uuidv4();

    // Use attachment_id instead of icon
    sectionRows.push({
      section_id: sectionId,
      strategy_id: strategyId,
      type: sec.type,
      title: sec.title,
      attachment_id: sec.attachment_id, // <--- required, must be provided in payload
      content: sec.content || null,
    });

    if (sec.type === "core_values" && Array.isArray(sec.core_values)) {
      sec.core_values.forEach((value) => {
        coreValueRows.push({
          value_id: uuidv4(),
          section_id: sectionId,
          title: value.title,
          attachment_id: value.attachment_id, // <--- required, must be provided
          content: value.content || null,
        });
      });
    }
  });

  return { sectionRows, coreValueRows };
};

// ============================================
// CREATE STRATEGY
// ============================================

const createStrategy = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { title, description, sections } = req.body;

    if (!title) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Strategy title is required",
      });
    }

    const strategyId = uuidv4();

    const strategy = await Strategy.create(
      {
        strategy_id: strategyId,
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t },
    );

    if (Array.isArray(sections) && sections.length > 0) {
      const { sectionRows, coreValueRows } = prepareStrategyData(
        sections,
        strategyId,
      );

      if (sectionRows.length > 0) {
        await StrategySection.bulkCreate(sectionRows, { transaction: t });
      }

      if (coreValueRows.length > 0) {
        await CoreValue.bulkCreate(coreValueRows, { transaction: t });
      }
    }

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Strategy created successfully",
      data: strategy,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Create Strategy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create strategy",
      error: error.message,
    });
  }
};

// ============================================
// UPDATE STRATEGY
// ============================================

const updateStrategy = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { title, description, sections } = req.body;

    if (!isUuid(id)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid strategy ID",
      });
    }

    const strategy = await Strategy.findByPk(id, { transaction: t });

    if (!strategy) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Strategy not found",
      });
    }

    await strategy.update(
      {
        title,
        description,
        updated_at: new Date(),
      },
      { transaction: t },
    );

    if (Array.isArray(sections)) {
      // Delete old core values
      const existingSections = await StrategySection.findAll({
        where: { strategy_id: id },
        attributes: ["section_id"],
        transaction: t,
      });

      const sectionIds = existingSections.map((s) => s.section_id);

      if (sectionIds.length > 0) {
        await CoreValue.destroy({
          where: { section_id: sectionIds },
          transaction: t,
        });
      }

      await StrategySection.destroy({
        where: { strategy_id: id },
        transaction: t,
      });

      // Create new sections & core values using attachment_id
      const { sectionRows, coreValueRows } = prepareStrategyData(sections, id);

      if (sectionRows.length > 0) {
        await StrategySection.bulkCreate(sectionRows, { transaction: t });
      }

      if (coreValueRows.length > 0) {
        await CoreValue.bulkCreate(coreValueRows, { transaction: t });
      }
    }

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Strategy updated successfully",
      data: strategy,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Update Strategy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update strategy",
      error: error.message,
    });
  }
};

// ============================================
// GET ALL STRATEGIES
// ============================================

const getAllStrategies = async (req, res) => {
  try {
    const strategies = await Strategy.findAll({
      include: [
        {
          model: StrategySection,
          as: "sections",
          include: [
            {
              model: CoreValue,
              as: "core_values",
            },
            {
              model: Attachment,
              as: "attachment", // Include attachment for sections
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: strategies.length,
      data: strategies,
    });
  } catch (error) {
    console.error("Fetch Strategies Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch strategies",
      error: error.message,
    });
  }
};

// ============================================
// GET STRATEGY BY ID
// ============================================

const getStrategyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid strategy ID",
      });
    }

    const strategy = await Strategy.findByPk(id, {
      include: [
        {
          model: StrategySection,
          as: "sections",
          include: [
            {
              model: CoreValue,
              as: "core_values",
            },
            {
              model: Attachment,
              as: "attachment", // Include attachment for sections
            },
          ],
        },
      ],
    });

    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: strategy,
    });
  } catch (error) {
    console.error("Get Strategy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch strategy",
      error: error.message,
    });
  }
};

// ============================================
// DELETE STRATEGY
// ============================================

const deleteStrategy = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    if (!isUuid(id)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid strategy ID",
      });
    }

    const strategy = await Strategy.findByPk(id, { transaction: t });

    if (!strategy) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Strategy not found",
      });
    }

    const sections = await StrategySection.findAll({
      where: { strategy_id: id },
      attributes: ["section_id"],
      transaction: t,
    });

    const sectionIds = sections.map((s) => s.section_id);

    if (sectionIds.length > 0) {
      await CoreValue.destroy({
        where: { section_id: sectionIds },
        transaction: t,
      });
    }

    await StrategySection.destroy({
      where: { strategy_id: id },
      transaction: t,
    });

    await strategy.destroy({ transaction: t });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Strategy deleted successfully",
    });
  } catch (error) {
    if (!t.finished) await t.rollback();

    console.error("Delete Strategy Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete strategy",
      error: error.message,
    });
  }
};

module.exports = {
  createStrategy,
  getAllStrategies,
  getStrategyById,
  updateStrategy,
  deleteStrategy,
};
