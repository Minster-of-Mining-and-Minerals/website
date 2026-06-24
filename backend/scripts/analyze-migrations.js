"use strict";

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../migrations");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js")).sort();

const results = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), "utf8");
  const tables = [...content.matchAll(/createTable\(["']([^"']+)["']/g)].map((m) => m[1]);
  const refs = [
    ...content.matchAll(/references:\s*\{[^}]*model:\s*["']([^"']+)["']/gs),
    ...content.matchAll(/references:\s*\{[^}]*table:\s*["']([^"']+)["']/gs),
  ].map((m) => m[1]);
  const addCols = [...content.matchAll(/addColumn\(["']([^"']+)["'],\s*["']([^"']+)["']/g)].map((m) => ({
    table: m[1],
    col: m[2],
  }));
  const removeConstraint = [
    ...content.matchAll(/removeConstraint\(["']([^"']+)["'],\s*["']([^"']+)["']/g),
  ].map((m) => ({ table: m[1], constraint: m[2] }));
  const addConstraintTables = [...content.matchAll(/addConstraint\(["']([^"']+)["']/g)].map((m) => m[1]);
  const bulkInsert = content.includes("bulkInsert");
  const hasIfExists = /IF EXISTS/i.test(content);
  const dropTableOnly = /async down[\s\S]*?dropTable/g.test(content);
  const enumDrops = [...content.matchAll(/DROP TYPE IF EXISTS/g)].length;

  results.push({
    file,
    tables,
    refs: [...new Set(refs)],
    addCols,
    removeConstraint,
    addConstraintTables,
    bulkInsert,
    hasIfExists,
    dropTableOnly,
    enumDrops,
  });
}

// Build dependency graph
const tableCreatedIn = {};
const allTables = new Set();
for (const r of results) {
  for (const t of r.tables) {
    tableCreatedIn[t] = r.file;
    allTables.add(t);
  }
}

const fkIssues = [];
for (const r of results) {
  for (const ref of r.refs) {
    if (!allTables.has(ref) && ref !== "attachments" && ref !== "users") {
      // check if ref table exists in earlier migration
    }
    const refFile = tableCreatedIn[ref];
    if (refFile && refFile > r.file) {
      fkIssues.push({ migration: r.file, table: r.tables[0], references: ref, refCreatedIn: refFile });
    }
    if (!refFile && !["SequelizeMeta"].includes(ref)) {
      // might be created before or missing
      if (!allTables.has(ref)) {
        fkIssues.push({ migration: r.file, table: r.tables[0], references: ref, refCreatedIn: "NOT FOUND" });
      }
    }
  }
}

// Duplicate timestamps
const timestamps = {};
for (const f of files) {
  const ts = f.split("-")[0];
  if (!timestamps[ts]) timestamps[ts] = [];
  timestamps[ts].push(f);
}
const dupTimestamps = Object.entries(timestamps).filter(([, v]) => v.length > 1);

console.log("=== SUMMARY ===");
console.log("Total migrations:", files.length);
console.log("Tables created:", allTables.size);
console.log("\n=== DUPLICATE TIMESTAMPS ===");
console.log(JSON.stringify(dupTimestamps, null, 2));
console.log("\n=== FK ORDERING ISSUES ===");
console.log(JSON.stringify(fkIssues, null, 2));
console.log("\n=== CORRECTIVE MIGRATIONS ===");
console.log(
  JSON.stringify(
    results.filter(
      (r) =>
        r.file.includes("fix-") ||
        r.file.includes("add-") ||
        r.file.includes("remove-") ||
        r.removeConstraint.length > 0
    ),
    null,
    2
  )
);
console.log("\n=== SEED MIGRATIONS ===");
console.log(JSON.stringify(results.filter((r) => r.bulkInsert), null, 2));
console.log("\n=== MIGRATIONS WITHOUT IF EXISTS IN DOWN ===");
console.log(
  results
    .filter((r) => r.tables.length > 0 && !r.hasIfExists)
    .map((r) => r.file)
    .join("\n")
);
console.log("\n=== FULL TABLE CREATION ORDER ===");
for (const r of results) {
  if (r.tables.length) console.log(`${r.file}: ${r.tables.join(", ")}`);
}
