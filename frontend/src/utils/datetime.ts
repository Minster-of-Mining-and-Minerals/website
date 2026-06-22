import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

export const APP_TIMEZONE =
  process.env.NEXT_PUBLIC_TIMEZONE || "Africa/Addis_Ababa";

export const TIMEZONE_LABEL = "East Africa Time (EAT)";

function toZonedDate(iso: string | null | undefined): TZDate | null {
  if (!iso) return null;
  return new TZDate(iso, APP_TIMEZONE);
}

/** UTC ISO string → value for `<input type="datetime-local" />` in app timezone. */
export function toDatetimeLocalInput(iso: string | null | undefined): string {
  const zoned = toZonedDate(iso);
  if (!zoned) return "";
  return format(zoned, "yyyy-MM-dd'T'HH:mm");
}

/** datetime-local wall time in app timezone → UTC ISO string for API. */
export function fromDatetimeLocalInput(
  localValue: string
): string | null {
  if (!localValue) return null;

  const [datePart, timePart = "00:00"] = localValue.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const zoned = new TZDate(
    year,
    month - 1,
    day,
    hour,
    minute,
    0,
    0,
    APP_TIMEZONE
  );

  return new Date(+zoned).toISOString();
}

/** Format date + time in app timezone with EAT suffix. */
export function formatDateTime(iso: string | null | undefined): string {
  const zoned = toZonedDate(iso);
  if (!zoned) return "";
  return `${format(zoned, "dd MMM yyyy, hh:mm a")} EAT`;
}

/** Format date only in app timezone. */
export function formatDate(iso: string | null | undefined): string {
  const zoned = toZonedDate(iso);
  if (!zoned) return "";
  return format(zoned, "dd MMM yyyy");
}

/** Format long date in app timezone (e.g. June 22, 2026). */
export function formatLongDate(iso: string | null | undefined): string {
  const zoned = toZonedDate(iso);
  if (!zoned) return "";
  return format(zoned, "MMMM d, yyyy");
}

/** Format time only in app timezone with EAT suffix. */
export function formatTime(iso: string | null | undefined): string {
  const zoned = toZonedDate(iso);
  if (!zoned) return "";
  return `${format(zoned, "hh:mm a")} EAT`;
}

/** Format time only in app timezone (no suffix, for compact cards). */
export function formatTimeShort(iso: string | null | undefined): string {
  const zoned = toZonedDate(iso);
  if (!zoned) return "";
  return format(zoned, "hh:mm a");
}
