"use strict";

const moment = require("moment-timezone");

const APP_TZ = process.env.APP_TIMEZONE || "Africa/Addis_Ababa";

/** Current instant as a UTC Date (for DB comparisons). */
function nowUtc() {
  return new Date();
}

/** Format a stored UTC value for logs/admin output in app timezone. */
function formatInAppTz(value, pattern = "YYYY-MM-DD HH:mm:ss") {
  if (!value) return "";
  return moment(value).tz(APP_TZ).format(pattern);
}

/** Parse datetime-local wall time (APP_TZ) → UTC ISO string for storage. */
function parseAdminDatetimeLocal(localValue) {
  if (!localValue) return null;
  return moment.tz(localValue, "YYYY-MM-DDTHH:mm", APP_TZ).utc().toISOString();
}

/** UTC ISO → datetime-local input value in APP_TZ. */
function toDatetimeLocalValue(isoValue) {
  if (!isoValue) return "";
  return moment(isoValue).tz(APP_TZ).format("YYYY-MM-DDTHH:mm");
}

module.exports = {
  APP_TZ,
  nowUtc,
  formatInAppTz,
  parseAdminDatetimeLocal,
  toDatetimeLocalValue,
};
