// controllers/partnerController.js
"use strict";
const { Partner, PartnerAttachment, Attachment, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ============================================
// HELPER: Validate Attachment
// ============================================
const validateAttachment = async (attachment_id, transaction) => {
    if (!attachment_id) return;
    const attachment = await Attachment.findByPk(attachment_id, { transaction });
    if (!attachment) {
        throw new Error("Invalid attachment_id");
    }
};

// ============================================
// CREATE PARTNER
// ============================================
const createPartner = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { title, description, attachments } = req.body;

        if (!title) {
            await t.rollback();
            return res.status(400).json({ success: false, message: "Partner title is required." });
        }

        const partner = await Partner.create(
            {
                partner_id: uuidv4(),
                title,
                description,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        // Handle attachments
        if (Array.isArray(attachments) && attachments.length > 0) {
            const attachmentRows = [];
            for (const { attachment_id, category } of attachments) {
                await validateAttachment(attachment_id, t);
                attachmentRows.push({
                    partner_attachment_id: uuidv4(),
                    partner_id: partner.partner_id,
                    attachment_id,
                    category: category || "logo",
                    created_at: new Date(),
                });
            }
            await PartnerAttachment.bulkCreate(attachmentRows, { transaction: t });
        }

        await t.commit();
        return res.status(201).json({
            success: true,
            message: "Partner created successfully",
            data: partner,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Partner Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create partner",
            error: error.message,
        });
    }
};

// ============================================
// GET ALL PARTNERS
// ============================================
const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.findAll({
            where: { deleted_at: null },
            include: [
                {
                    model: PartnerAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            count: partners.length,
            data: partners,
        });
    } catch (error) {
        console.error("Fetch Partners Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch partners",
            error: error.message,
        });
    }
};

// ============================================
// GET PARTNER BY ID
// ============================================
const getPartnerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isUuid(id)) {
            return res.status(400).json({ success: false, message: "Invalid partner ID." });
        }

        const partner = await Partner.findByPk(id, {
            include: [
                {
                    model: PartnerAttachment,
                    as: "attachments",
                    include: [{ model: Attachment, as: "attachment" }],
                },
            ],
        });

        if (!partner) {
            return res.status(404).json({ success: false, message: "Partner not found." });
        }

        return res.status(200).json({
            success: true,
            data: partner,
        });
    } catch (error) {
        console.error("Get Partner Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch partner",
            error: error.message,
        });
    }
};

// ============================================
// UPDATE PARTNER
// ============================================
const updatePartner = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, description, attachments } = req.body;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({ success: false, message: "Invalid partner ID." });
        }

        const partner = await Partner.findByPk(id, { transaction: t });
        if (!partner) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Partner not found." });
        }

        await partner.update(
            { title, description, updated_at: new Date() },
            { transaction: t }
        );

        // Update attachments if provided
        if (Array.isArray(attachments)) {
            await PartnerAttachment.destroy({ where: { partner_id: id }, transaction: t });

            const attachmentRows = [];
            for (const { attachment_id, category } of attachments) {
                await validateAttachment(attachment_id, t);
                attachmentRows.push({
                    partner_attachment_id: uuidv4(),
                    partner_id: id,
                    attachment_id,
                    category: category || "logo",
                    created_at: new Date(),
                });
            }
            await PartnerAttachment.bulkCreate(attachmentRows, { transaction: t });
        }

        await t.commit();
        return res.status(200).json({
            success: true,
            message: "Partner updated successfully",
            data: partner,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Partner Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update partner",
            error: error.message,
        });
    }
};

// ============================================
// DELETE PARTNER (soft delete)
// ============================================
const deletePartner = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({ success: false, message: "Invalid partner ID." });
        }

        const partner = await Partner.findByPk(id, { transaction: t });
        if (!partner) {
            await t.rollback();
            return res.status(404).json({ success: false, message: "Partner not found." });
        }

        await partner.update({ deleted_at: new Date() }, { transaction: t });
        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Partner deleted successfully (soft delete)",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Partner Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete partner",
            error: error.message,
        });
    }
};

module.exports = {
    createPartner,
    getAllPartners,
    getPartnerById,
    updatePartner,
    deletePartner,
};