/**
 * One-time script: generate WebP variants for existing image attachments.
 * Usage: node scripts/reprocess-attachments.js
 */
require("dotenv").config();

const path = require("path");
const fs = require("fs");
const { Attachment } = require("../models");
const {
  isProcessableImage,
  processImage,
  toAttachmentPayload,
} = require("../utils/imageProcessor");

async function reprocessAttachments() {
  const attachments = await Attachment.findAll({
    order: [["created_at", "ASC"]],
  });

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const attachment of attachments) {
    if (attachment.file_path_thumb && attachment.file_path_medium) {
      skipped += 1;
      continue;
    }

    const sourcePath = attachment.file_path;
    if (!sourcePath || !fs.existsSync(sourcePath)) {
      skipped += 1;
      continue;
    }

    const ext = path.extname(sourcePath).toLowerCase();
    const mimeGuess =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : null;

    if (!mimeGuess || !isProcessableImage(mimeGuess)) {
      skipped += 1;
      continue;
    }

    try {
      const result = await processImage(
        sourcePath,
        attachment.attachment_id,
        attachment.file_name,
      );

      await attachment.update({
        file_name: result.file_name,
        file_path: result.file_path,
        file_path_thumb: result.file_path_thumb,
        file_path_medium: result.file_path_medium,
        file_path_large: result.file_path_large,
        mime_type: result.mime_type,
        width: result.width,
        height: result.height,
      });

      if (sourcePath !== result.file_path && fs.existsSync(sourcePath)) {
        const legacyDir = path.dirname(sourcePath);
        const variantDir = path.join("uploads", "attachments", attachment.attachment_id);
        if (legacyDir !== variantDir && !legacyDir.includes(attachment.attachment_id)) {
          fs.unlinkSync(sourcePath);
        }
      }

      processed += 1;
      console.log(`Processed ${attachment.attachment_id}`);
    } catch (error) {
      failed += 1;
      console.error(`Failed ${attachment.attachment_id}:`, error.message);
    }
  }

  console.log({ processed, skipped, failed, total: attachments.length });
}

reprocessAttachments()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
