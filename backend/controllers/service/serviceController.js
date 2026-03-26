"use strict";

const { Service, sequelize } = require("../../models");
const { v4: uuidv4, validate: isUuid } = require("uuid");

// ===========================
// CREATE SERVICE
// ===========================
const createService = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { icon, title, content } = req.body;

        if (!icon || !title || !content) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "icon, title and content are required.",
            });
        }

        // Check if service already exists
        const existingService = await Service.findOne({ where: { title } });
        if (existingService) {
            await t.rollback();
            return res.status(409).json({
                success: false,
                message: "Service with this title already exists.",
            });
        }

        const service = await Service.create(
            {
                service_id: uuidv4(),
                icon,
                title,
                content,
                created_at: new Date(),
            },
            { transaction: t }
        );

        await t.commit();
        return res.status(201).json({
            success: true,
            message: "Service created successfully.",
            data: service,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Service Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create service",
            error: error.message,
        });
    }
};

// ===========================
// GET ALL SERVICES
// ===========================
const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "Services fetched successfully",
            count: services.length,
            data: services,
        });
    } catch (error) {
        console.error("Get Services Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch services",
            error: error.message,
        });
    }
};

// ===========================
// GET SERVICE BY ID
// ===========================
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service ID.",
            });
        }

        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: service,
        });
    } catch (error) {
        console.error("Get Service Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch service",
            error: error.message,
        });
    }
};

// ===========================
// UPDATE SERVICE
// ===========================
const updateService = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { icon, title, content } = req.body;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid service ID.",
            });
        }

        const service = await Service.findByPk(id, { transaction: t });
        if (!service) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        await service.update(
            {
                icon: icon ?? service.icon,
                title: title ?? service.title,
                content: content ?? service.content,
            },
            { transaction: t }
        );

        await t.commit();
        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: service,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Service Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update service",
            error: error.message,
        });
    }
};

// ===========================
// DELETE SERVICE
// ===========================
const deleteService = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Invalid service ID.",
            });
        }

        const service = await Service.findByPk(id, { transaction: t });
        if (!service) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        await service.destroy({ transaction: t });
        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Service Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete service",
            error: error.message,
        });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};