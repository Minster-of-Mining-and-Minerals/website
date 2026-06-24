"use strict";

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../migrations");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js")).sort();

const tableCreatedIn = {};
const tableFks = {}; // table -> [{ column, refTable, onDelete }]

function extractFks(content, tableName) {
  const fks = [];
  const colBlocks = content.match(/(\w+):\s*\{[^}]*references:\s*\{[^}]+\}[^}]*\}/gs) || [];
  for (const block of colBlocks) {
    const colMatch = block.match(/^(\w+):/);
    const modelMatch = block.match(/model:\s*["']([^"']+)["']/);
    const onDeleteMatch = block.match(/onDelete:\s*["']([^"']+)["']/);
    if (colMatch && modelMatch) {
      fks.push({
        column: colMatch[1],
        refTable: modelMatch[1],
        onDelete: onDeleteMatch ? onDeleteMatch[1] : "NO ACTION",
      });
    }
  }
  if (fks.length) tableFks[tableName] = fks;
}

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), "utf8");
  const tables = [...content.matchAll(/createTable\(["']([^"']+)["']/g)].map((m) => m[1]);
  for (const t of tables) {
    tableCreatedIn[t] = file;
    extractFks(content, t);
  }
}

// Topological sort for creation order validation
const allTables = Object.keys(tableCreatedIn);
const deps = {};
for (const t of allTables) deps[t] = new Set();
for (const [table, fks] of Object.entries(tableFks)) {
  for (const fk of fks) {
    if (tableCreatedIn[fk.refTable]) deps[table].add(fk.refTable);
  }
}

// Reverse topological order for drops
function reverseDropOrder(tables) {
  const visited = new Set();
  const order = [];
  function visit(t) {
    if (visited.has(t)) return;
    visited.add(t);
    for (const child of allTables) {
      if (deps[child]?.has(t)) visit(child);
    }
    order.push(t);
  }
  for (const t of tables) visit(t);
  return order.reverse();
}

const dropOrder = reverseDropOrder(allTables);

// Group migrations by phase
const phases = {
  auth: ["user_types", "permissions", "roles", "role_permissions", "users", "user_roles"],
  core: ["attachments", "tags", "news", "news_metadata", "news_attachments", "news_tags", "news_reactions", "news_reads", "news_feedbacks"],
  content: ["services", "backgrounds", "background_attachments", "leadership", "leadership_attachments"],
  cms: ["strategies", "strategy_sections", "core_values", "regions", "federal_office_contacts", "regional_office_contact_centers", "licensing_contacts", "messages", "social_medias", "footers", "footer_sections", "cards", "sliders", "partners", "partner_attachments", "gamestones", "gamestone_attachments", "resource", "resource_attachments"],
  sector: ["snapshot", "snapshot_section", "asm", "objectives", "asm_attachments", "asm_previews", "investigate_ethiopia", "investigation_action", "investigation_strategy"],
  petroleum: ["petroleum_objective", "petroleum_attachments", "petroleum_processes", "process_blocks", "process_block_attachments", "process_steps", "steps", "petroleum_regulation_process", "petroleum_regulation", "petroleum_regulation_attachments", "petroleum_directive"],
  mining: ["mining_application_process", "mining_application_process_attachments", "mining_application_types", "mining_regulation_process", "mining_framework", "mining_guideline", "mining_guideline_content", "mining_guideline_attachments", "mining_service", "mining_service_card"],
  system: ["audit_logs", "event_categories", "events", "event_attachments", "routes", "route_translations", "tenders", "vacancies"],
};

// Merge map
const mergePlan = [
  {
    remove: "20260417105500-fix-mining-attachment-constraints.js",
    mergeInto: [
      { file: "20260416142818-create-mining-framework.js", change: "attachment_id onDelete: RESTRICT -> SET NULL" },
      { file: "20260416142824-create-mining-guideline-attachments.js", change: "attachment_id onDelete: RESTRICT -> CASCADE" },
    ],
  },
  {
    remove: "20260417105600-fix-other-attachment-constraints.js",
    mergeInto: [
      { file: "20260404162044-create-snapshot.js", change: "attachment_id onDelete: RESTRICT -> CASCADE" },
      { file: "20260410111600-create-steps.js", change: "attachment_id onDelete: RESTRICT -> CASCADE" },
    ],
  },
  {
    remove: "20260417125500-add-is-published-to-news-feedback.js",
    mergeInto: [{ file: "20260220135313-create-news-feedbacks.js", change: "add is_published BOOLEAN column" }],
  },
  {
    remove: "20260417183004-remove-unique-from-permissions-resource.js",
    mergeInto: [{ file: "20251210084301-create-permissions.js", change: "add composite unique (resource, action)" }],
  },
  {
    remove: "20260622120000-add-attachment-image-variants.js",
    mergeInto: [{ file: "20260218195338-create-attachments-table.js", change: "add image variant columns" }],
  },
  {
    remove: "20260622120000-add-slider-button-columns.js",
    mergeInto: [{ file: "20260325172632-create-sliders-table.js", change: "add button_name, button_url, button2_name, button2_url" }],
  },
];

const seedMigrationsToMove = [
  "20260622130001-seed-opportunities-permissions.js",
  "20260622140200-seed-tenders-vacancies-permissions.js",
];

console.log("=== REVERSE DROP ORDER (first 20) ===");
console.log(dropOrder.slice(0, 20).join(" -> "));
console.log("...\nTotal tables:", dropOrder.length);

console.log("\n=== MERGE PLAN ===");
console.log(JSON.stringify(mergePlan, null, 2));

console.log("\n=== TABLES WITH FK DEPENDENCIES ===");
for (const [t, fks] of Object.entries(tableFks)) {
  console.log(`${t}: ${fks.map((f) => `${f.column}->${f.refTable}(${f.onDelete})`).join(", ")}`);
}

console.log("\n=== SEED MIGRATIONS TO MOVE TO SEEDERS ===");
console.log(seedMigrationsToMove.join("\n"));

console.log("\n=== FINAL MIGRATION COUNT AFTER REFACTOR ===");
console.log("Current:", files.length);
console.log("After removing corrective:", files.length - 6);
console.log("After moving seeds:", files.length - 6 - 2);
console.log("= 77 schema migrations");
