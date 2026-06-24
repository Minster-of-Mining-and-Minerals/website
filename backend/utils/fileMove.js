const fs = require("fs");
const path = require("path");

/**
 * Move a file within the same tree, or across mounts (e.g. Docker volume).
 * rename() fails with EXDEV when source and dest are on different devices.
 */
function moveFileSync(source, destination) {
  const destDir = path.dirname(destination);
  fs.mkdirSync(destDir, { recursive: true });

  try {
    fs.renameSync(source, destination);
  } catch (error) {
    if (error.code !== "EXDEV") {
      throw error;
    }
    fs.copyFileSync(source, destination);
    fs.unlinkSync(source);
  }
}

module.exports = { moveFileSync };
