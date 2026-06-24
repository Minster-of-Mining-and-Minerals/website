"use strict";

/**
 * Pack reprocessed uploads for production deploy.
 * Output: backend/deploy-uploads.tar.gz (extract at backend/ → uploads/)
 * Usage: npm run deploy:pack
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BACKEND_ROOT = path.join(__dirname, "..");
const UPLOADS_DIR = path.join(BACKEND_ROOT, "uploads");
const OUTPUT = path.join(BACKEND_ROOT, "deploy-uploads.tar.gz");

function main() {
  if (!fs.existsSync(path.join(UPLOADS_DIR, "attachments"))) {
    console.error("Missing uploads/attachments. Run db:upgrade-from-server or reprocess-attachments first.");
    process.exit(1);
  }

  const fileCount = execSync(
    process.platform === "win32"
      ? `powershell -NoProfile -Command "(Get-ChildItem -Path '${UPLOADS_DIR}' -Recurse -File).Count"`
      : `find "${UPLOADS_DIR}" -type f | wc -l`,
    { encoding: "utf8" },
  ).trim();

  if (fs.existsSync(OUTPUT)) {
    fs.unlinkSync(OUTPUT);
  }

  console.log(`Packing ${fileCount} files from uploads/...`);
  execSync(`tar -czf "${OUTPUT}" uploads`, { cwd: BACKEND_ROOT, stdio: "inherit" });

  const sizeMb = (fs.statSync(OUTPUT).size / (1024 * 1024)).toFixed(2);
  console.log(`Created ${path.basename(OUTPUT)} (${sizeMb} MB)`);
  console.log("Commit and push with db-snapshot.sql for server deploy.");
}

main();
