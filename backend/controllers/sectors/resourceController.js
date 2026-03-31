"use strict";

const {
    Resource,
    ResourceAttachment,
    Attachment,
    sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE RESOURCE
=========================== */
const createResource = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { sector, title, description, attachments } = req.body;

        if (!title || !description || !sector) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title, sector, and description are required.",
            });
        }

        const resource = await Resource.create(
            {
                resource_id: uuidv4(),
                sector,
                title,
                description,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= ATTACHMENTS ========= */
        if (Array.isArray(attachments) && attachments.length > 0) {
            const rows = attachments.map(({ attachment_id, label }) => ({
                resource_attachment_id: uuidv4(),
                resource_id: resource.resource_id,
                attachment_id,
                label,
                created_at: new Date(),
            }));

            await ResourceAttachment.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Resource created successfully",
            data: resource,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Resource Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create resource",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL RESOURCES
=========================== */
const getAllResources = async (req, res) => {
    try {
        const { search, sector } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        if (sector) {
            whereClause.sector = sector;
        }

        const resources = await Resource.findAll({
            where: whereClause,
            include: [
                {
                    model: ResourceAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "Resources fetched successfully",
            count: resources.length,
            data: resources,
        });
    } catch (error) {
        console.error("Get Resources Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch resources",
            error: error.message,
        });
    }
};

/* ===========================
   GET RESOURCE BY ID
=========================== */
const getResourceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid resource ID",
            });
        }

        const resource = await Resource.findByPk(id, {
            include: [
                {
                    model: ResourceAttachment,
                    as: "attachments",
                    include: [
                        {
                            model: Attachment,
                            as: "attachment",
                        },
                    ],
                },
            ],
        });

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Resource fetched successfully",
            data: resource,
        });
    } catch (error) {
        console.error("Get Resource Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch resource",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE RESOURCE
=========================== */
const updateResource = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, description, sector, attachments } = req.body;

        const resource = await Resource.findByPk(id, { transaction: t });

        if (!resource) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        await resource.update(
            {
                title,
                description,
                sector,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= UPDATE ATTACHMENTS ========= */
        if (Array.isArray(attachments)) {
            await ResourceAttachment.destroy({
                where: { resource_id: id },
                transaction: t,
            });

            const rows = attachments.map(({ attachment_id, label }) => ({
                resource_attachment_id: uuidv4(),
                resource_id: id,
                attachment_id,
                label,
                created_at: new Date(),
            }));

            await ResourceAttachment.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Resource updated successfully",
            data: resource,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Resource Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update resource",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE RESOURCE (SOFT)
=========================== */
const deleteResource = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const resource = await Resource.findByPk(id, { transaction: t });

        if (!resource) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Resource not found",
            });
        }

        await resource.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Resource deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Resource Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete resource",
            error: error.message,
        });
    }
};

module.exports = {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
};