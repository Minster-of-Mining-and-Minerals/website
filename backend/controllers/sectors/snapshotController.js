"use strict";

const {
    Snapshot,
    SnapshotSection,
    Attachment,
    sequelize,
} = require("../../models");

const { v4: uuidv4, validate: isUuid } = require("uuid");
const { Op } = require("sequelize");

/* ===========================
   CREATE SNAPSHOT
=========================== */
const createSnapshot = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            title,
            sector,
            description_one,
            description_two,
            attachment_id,
            attachment_description,
            sections,
        } = req.body;

        if (!title || !sector || !description_one || !description_two) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: "Title, sector and descriptions are required.",
            });
        }

        const snapshot = await Snapshot.create(
            {
                snapshot_id: uuidv4(),
                title,
                sector,
                description_one,
                description_two,
                attachment_id,
                attachment_description,
                created_at: new Date(),
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= SECTIONS ========= */
        if (Array.isArray(sections) && sections.length > 0) {
            const rows = sections.map(({ title, content }) => ({
                section_id: uuidv4(),
                snapshot_id: snapshot.snapshot_id,
                title,
                content,
                created_at: new Date(),
            }));

            await SnapshotSection.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Snapshot created successfully",
            data: snapshot,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Create Snapshot Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create snapshot",
            error: error.message,
        });
    }
};

/* ===========================
   GET ALL SNAPSHOTS
=========================== */
const getAllSnapshots = async (req, res) => {
    try {
        const { search, sector, publishedOnly } = req.query;

        const whereClause = { deleted_at: null };

        if (search) {
            whereClause.title = {
                [Op.iLike]: `%${search}%`,
            };
        }

        if (sector) {
            whereClause.sector = sector;
        }

        if (publishedOnly === "true") {
            whereClause.is_published = true;
        }

        const snapshots = await Snapshot.findAll({
            where: whereClause,
            include: [
                {
                    model: SnapshotSection,
                    as: "sections",
                },
                {
                    model: Attachment,
                    as: "attachment", // ⚠️ make sure you define this association
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            message: "Snapshots fetched successfully",
            count: snapshots.length,
            data: snapshots,
        });
    } catch (error) {
        console.error("Get Snapshots Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch snapshots",
            error: error.message,
        });
    }
};

/* ===========================
   GET SNAPSHOT BY ID
=========================== */
const getSnapshotById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isUuid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid snapshot ID",
            });
        }

        const snapshot = await Snapshot.findByPk(id, {
            include: [
                {
                    model: SnapshotSection,
                    as: "sections",
                },
                {
                    model: Attachment,
                    as: "attachment",
                },
            ],
        });

        if (!snapshot) {
            return res.status(404).json({
                success: false,
                message: "Snapshot not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Snapshot fetched successfully",
            data: snapshot,
        });
    } catch (error) {
        console.error("Get Snapshot Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch snapshot",
            error: error.message,
        });
    }
};

/* ===========================
   UPDATE SNAPSHOT
=========================== */
const updateSnapshot = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const {
            title,
            sector,
            description_one,
            description_two,
            attachment_id,
            attachment_description,
            sections,
        } = req.body;

        const snapshot = await Snapshot.findByPk(id, { transaction: t });

        if (!snapshot) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Snapshot not found",
            });
        }

        await snapshot.update(
            {
                title,
                sector,
                description_one,
                description_two,
                attachment_id,
                attachment_description,
                updated_at: new Date(),
            },
            { transaction: t }
        );

        /* ========= UPDATE SECTIONS ========= */
        if (Array.isArray(sections)) {
            await SnapshotSection.destroy({
                where: { snapshot_id: id },
                transaction: t,
            });

            const rows = sections.map(({ title, content }) => ({
                section_id: uuidv4(),
                snapshot_id: id,
                title,
                content,
                created_at: new Date(),
            }));

            await SnapshotSection.bulkCreate(rows, { transaction: t });
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Snapshot updated successfully",
            data: snapshot,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Update Snapshot Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update snapshot",
            error: error.message,
        });
    }
};

/* ===========================
   DELETE SNAPSHOT (SOFT)
=========================== */
const deleteSnapshot = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const snapshot = await Snapshot.findByPk(id, { transaction: t });

        if (!snapshot) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Snapshot not found",
            });
        }

        await snapshot.update(
            { deleted_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: "Snapshot deleted successfully",
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Delete Snapshot Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete snapshot",
            error: error.message,
        });
    }
};

/* ===========================
   TOGGLE PUBLISH SNAPSHOT
=========================== */
const togglePublishSnapshot = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;

        const snapshot = await Snapshot.findByPk(id, { transaction: t });

        if (!snapshot) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: "Snapshot not found",
            });
        }

        const newStatus = !snapshot.is_published;

        // If setting this one to published (true), unpublish all others in the SAME sector
        if (newStatus === true) {
            await Snapshot.update(
                { is_published: false, updated_at: new Date() },
                {
                    where: {
                        sector: snapshot.sector,
                        snapshot_id: { [Op.ne]: id },
                        deleted_at: null,
                    },
                    transaction: t,
                }
            );
        }

        await snapshot.update(
            { is_published: newStatus, updated_at: new Date() },
            { transaction: t }
        );

        await t.commit();

        return res.status(200).json({
            success: true,
            message: `Snapshot ${newStatus ? "published" : "unpublished"} successfully`,
            data: snapshot,
        });
    } catch (error) {
        if (!t.finished) await t.rollback();
        console.error("Toggle Publish Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update publish status",
            error: error.message,
        });
    }
};

module.exports = {
    createSnapshot,
    getAllSnapshots,
    getSnapshotById,
    updateSnapshot,
    deleteSnapshot,
    togglePublishSnapshot,
};