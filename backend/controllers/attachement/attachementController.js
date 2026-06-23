const { Attachment } = require("../../models");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");
const {
    isProcessableImage,
    processImage,
    removeAttachmentFiles,
    toAttachmentPayload,
} = require("../../utils/imageProcessor");

const uploadFiles = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded",
            });
        }

        const uploadDir = path.join("uploads", "attachments");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uploadedFiles = [];

        for (const file of req.files) {
            const recordData = {
                created_at: new Date(),
            };

            if (req.user && req.user.user_id) {
                recordData.uploaded_by = req.user.user_id;
            }

            if (isProcessableImage(file.mimetype)) {
                const attachmentId = randomUUID();
                const processed = await processImage(
                    file.path,
                    attachmentId,
                    file.originalname,
                );

                Object.assign(recordData, processed, { attachment_id: attachmentId });

                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            } else {
                const newPath = path.join(uploadDir, file.filename);
                fs.renameSync(file.path, newPath);

                recordData.file_name = file.filename;
                recordData.file_path = newPath.replace(/\\/g, "/");
                recordData.mime_type = file.mimetype;
            }

            const record = await Attachment.create(recordData);
            uploadedFiles.push(toAttachmentPayload(record));
        }

        return res.status(201).json({
            success: true,
            message: "Files uploaded successfully",
            attachments: uploadedFiles,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({
            success: false,
            message: "Error uploading files",
            error: error.message,
        });
    }
};

const deleteAttachment = async (req, res) => {
    try {
        const { attachment_id } = req.params;

        const file = await Attachment.findByPk(attachment_id);
        if (!file) {
            return res.status(404).json({
                success: false,
                message: "Attachment not found",
            });
        }

        removeAttachmentFiles(file);
        await file.destroy();

        return res.status(200).json({
            success: true,
            message: "Attachment deleted",
            deleted_attachment: {
                attachment_id,
                file_name: file.file_name,
            },
        });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting attachment",
            error: error.message,
        });
    }
};

const getAllAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            count: attachments.length,
            attachments: attachments.map(toAttachmentPayload),
        });
    } catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching attachments",
            error: error.message,
        });
    }
};

module.exports = {
    uploadFiles,
    deleteAttachment,
    getAllAttachments,
};
