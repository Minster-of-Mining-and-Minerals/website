"use strict";

const fs = require("fs");

/** Strip PostgreSQL 17+/18-only lines so dumps import into Postgres 16 (Docker). */
function sanitizeSnapshotForPg16(content) {
  return content
    .split("\n")
    .filter(
      (line) =>
        !line.includes("transaction_timeout") &&
        !line.startsWith("\\restrict") &&
        !line.startsWith("\\unrestrict"),
    )
    .join("\n");
}

function sanitizeSnapshotFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const cleaned = sanitizeSnapshotForPg16(raw);
  if (cleaned !== raw) {
    fs.writeFileSync(filePath, cleaned);
    console.log("Sanitized snapshot for PostgreSQL 16 compatibility.");
  }
  return filePath;
}

module.exports = { sanitizeSnapshotForPg16, sanitizeSnapshotFile };
