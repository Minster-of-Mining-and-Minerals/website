"use strict";

const fs = require("fs");
const path = require("path");

const migrationsDir = path.join(__dirname, "../migrations");
const utilsRequire = `const {
  createTableIfNotExists,
  dropTableIfExists,
  addColumnIfNotExists,
  removeColumnIfExists,
  addConstraintIfNotExists,
  dropConstraintIfExists,
  dropEnumIfExists,
} = require("./lib/migration-utils");`;

const REMOVE_FILES = [
  "20260417105500-fix-mining-attachment-constraints.js",
  "20260417105600-fix-other-attachment-constraints.js",
  "20260417125500-add-is-published-to-news-feedback.js",
  "20260417183004-remove-unique-from-permissions-resource.js",
  "20260622120000-add-attachment-image-variants.js",
  "20260622120000-add-slider-button-columns.js",
  "20260622130001-seed-opportunities-permissions.js",
  "20260622140200-seed-tenders-vacancies-permissions.js",
];

const SKIP_TRANSFORM = new Set(REMOVE_FILES);

function addUtilsImport(content) {
  if (content.includes("migration-utils")) return content;
  const strictMatch = content.match(/^"use strict";\s*\n/);
  if (strictMatch) {
    return content.replace(strictMatch[0], `${strictMatch[0]}\n${utilsRequire}\n`);
  }
  return `"use strict";\n\n${utilsRequire}\n\n${content}`;
}

function transformMethods(content) {
  let next = content;
  next = next.replace(/await queryInterface\.createTable\(/g, "await createTableIfNotExists(queryInterface, ");
  next = next.replace(/await queryInterface\.dropTable\(/g, "await dropTableIfExists(queryInterface, ");
  next = next.replace(/await queryInterface\.addColumn\(/g, "await addColumnIfNotExists(queryInterface, ");
  next = next.replace(/await queryInterface\.removeColumn\(/g, "await removeColumnIfExists(queryInterface, ");
  next = next.replace(
    /await queryInterface\.sequelize\.query\('DROP TYPE IF EXISTS "([^"]+)";'\);/g,
    'await dropEnumIfExists(queryInterface, "$1");',
  );
  next = next.replace(
    /await queryInterface\.sequelize\.query\(`DROP TYPE IF EXISTS "([^"]+)";`\);/g,
    'await dropEnumIfExists(queryInterface, "$1");',
  );
  return next;
}

const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".js"));

for (const file of files) {
  if (SKIP_TRANSFORM.has(file)) continue;
  const filePath = path.join(migrationsDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  content = addUtilsImport(content);
  content = transformMethods(content);
  fs.writeFileSync(filePath, content);
  console.log("Transformed:", file);
}

for (const file of REMOVE_FILES) {
  const filePath = path.join(migrationsDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("Removed:", file);
  }
}

console.log("Done.");
