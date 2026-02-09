const DEFAULT_LOCALE = "en-GB" as const;
const DEFAULT_TIMEZONE = "Europe/Warsaw" as const;

type DateInput = string | number | Date;

function toValidDate(input: DateInput): Date | null {
  const date = input instanceof Date ? input : new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
}

const dateFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: DEFAULT_TIMEZONE,
});

const timeFormatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: DEFAULT_TIMEZONE,
});

/**
 * Example: "09 January 2026"
 */
export function formatEventDate(input: DateInput): string {
  const date = toValidDate(input);
  if (!date) return "";
  return dateFormatter.format(date);
}

/**
 * Example: "14:05"
 */
export function formatEventTime(input: DateInput): string {
  const date = toValidDate(input);
  if (!date) return "";
  return timeFormatter.format(date);
}
