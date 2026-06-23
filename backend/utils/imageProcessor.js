const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const VARIANTS = {
  thumb: { width: 400, quality: 75 },
  medium: { width: 1200, quality: 80 },
  large: { width: 2400, quality: 85 },
};

const PROCESSABLE_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isProcessableImage(mimetype) {
  return PROCESSABLE_IMAGE_TYPES.has(mimetype);
}

function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

async function processImage(tempPath, attachmentId, originalName) {
  const dir = path.join("uploads", "attachments", attachmentId);
  fs.mkdirSync(dir, { recursive: true });

  const metadata = await sharp(tempPath).metadata();
  const variantPaths = {};

  for (const [name, config] of Object.entries(VARIANTS)) {
    const outPath = path.join(dir, `${name}.webp`);
    await sharp(tempPath)
      .rotate()
      .resize({ width: config.width, withoutEnlargement: true })
      .webp({ quality: config.quality })
      .toFile(outPath);

    variantPaths[`file_path_${name}`] = normalizePath(outPath);
  }

  const ext = path.extname(originalName) || ".jpg";
  const safeBaseName = path
    .basename(originalName, ext)
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");
  const originalPath = path.join(dir, `original_${safeBaseName}${ext}`);
  fs.copyFileSync(tempPath, originalPath);

  return {
    file_name: originalName,
    file_path: variantPaths.file_path_large,
    file_path_thumb: variantPaths.file_path_thumb,
    file_path_medium: variantPaths.file_path_medium,
    file_path_large: variantPaths.file_path_large,
    mime_type: "image/webp",
    width: metadata.width ?? null,
    height: metadata.height ?? null,
  };
}

function removeAttachmentFiles(record) {
  const dir = path.join("uploads", "attachments", record.attachment_id);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    return;
  }

  const paths = new Set(
    [
      record.file_path,
      record.file_path_thumb,
      record.file_path_medium,
      record.file_path_large,
    ].filter(Boolean),
  );

  for (const filePath of paths) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

function toAttachmentPayload(record) {
  const data = record.toJSON ? record.toJSON() : record;

  return {
    attachment_id: data.attachment_id,
    file_name: data.file_name,
    file_path: data.file_path,
    file_path_thumb: data.file_path_thumb ?? null,
    file_path_medium: data.file_path_medium ?? null,
    file_path_large: data.file_path_large ?? null,
    mime_type: data.mime_type ?? null,
    width: data.width ?? null,
    height: data.height ?? null,
    uploaded_by: data.uploaded_by ?? null,
    created_at: data.created_at ?? null,
  };
}

module.exports = {
  isProcessableImage,
  processImage,
  removeAttachmentFiles,
  toAttachmentPayload,
};
