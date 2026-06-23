"use strict";

/**
 * Resolve public display status for tenders/vacancies.
 * - draft → draft (admin only)
 * - closed → closed
 * - published + past deadline → closed (computed)
 * - published + active → open
 */
function isPastDeadline(dateValue) {
  if (!dateValue) return false;
  const dateStr = String(dateValue).split("T")[0];
  const [year, month, day] = dateStr.split("-").map(Number);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
  return new Date() > endOfDay;
}

function resolveDisplayStatus(record, deadlineField) {
  if (!record) return "draft";
  if (record.status === "draft") return "draft";
  if (record.status === "closed") return "closed";
  if (record.status === "published") {
    if (isPastDeadline(record[deadlineField])) return "closed";
    return "open";
  }
  return record.status;
}

function withDisplayStatus(record, deadlineField) {
  const json = record.toJSON ? record.toJSON() : { ...record };
  return {
    ...json,
    display_status: resolveDisplayStatus(json, deadlineField),
  };
}

const TENDER_DOC_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const VACANCY_DOC_MIMES = ["application/pdf"];

function isAllowedTenderAttachment(mimeType, fileName) {
  if (mimeType && TENDER_DOC_MIMES.includes(mimeType)) return true;
  const ext = (fileName || "").split(".").pop()?.toLowerCase();
  return ["pdf", "doc", "docx"].includes(ext || "");
}

function isAllowedVacancyAttachment(mimeType, fileName) {
  if (mimeType && VACANCY_DOC_MIMES.includes(mimeType)) return true;
  const ext = (fileName || "").split(".").pop()?.toLowerCase();
  return ext === "pdf";
}

module.exports = {
  isPastDeadline,
  resolveDisplayStatus,
  withDisplayStatus,
  isAllowedTenderAttachment,
  isAllowedVacancyAttachment,
};
