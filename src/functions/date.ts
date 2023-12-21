import { DateTime } from "luxon";

/**
 * Parses a date in the provided format.
 * @param dateString ISO compliant date string.
 * @param format Luxon date parse format. Defaults to ISO.
 * @returns Parsed date or undefined if the date is invalid or cannot be parsed.
 */
export const dateFromString = (
  dateString: string | undefined | null,
  format?: string
): DateTime | undefined => {
  if (!dateString) return undefined;

  const date = format
    ? DateTime.fromFormat(dateString, format)
    : DateTime.fromISO(dateString);
  if (!date.isValid) return undefined;

  return date.setLocale("en-GB");
};

/**
 * Calls dateFromString with the EXIF date format.
 * @param dateString ISO compliant date string.
 * @returns Parsed date or undefined if the date is invalid or cannot be parsed.
 */
export const dateFromEXIFString = (
  dateString: string | undefined
): DateTime | undefined => dateFromString(dateString, "yyyy:MM:dd HH:mm:ss");

/**
 * Extract a date prefixed to a slug, if one is present.
 * @param slug Blog post slug.
 * @returns Parsed date or undefined if a valid ISO date is not present at the start of the slug.
 */
export const dateFromSlug = (slug: string): DateTime | undefined => {
  const dateString = slug.slice(0, 10);
  return dateFromString(dateString);
};

/**
 * Get the English ordinal for the given day of the month.
 * @param day Day of the month.
 * @returns Ordinal to be appended to the day of the month.
 */
export const getDateOrdinal = (day: number): string => {
  const ordinals = ["th", "st", "nd", "rd"];

  if (day >= 11 && day <= 13) return ordinals[0];
  return ordinals[day % 10] || ordinals[0];
};

/**
 * Express a date range in human readable form with no month or year repetition.
 * @param from Date for the start of the range.
 * @param to Date for the end of the range.
 * @returns Human readable date range e.g. "12th to 15th March 2023"
 */
export const formatDateRange = (from: DateTime, to?: DateTime): string => {
  const fromOrdinal = getDateOrdinal(from.day);

  if (!to) return from.toFormat("d! MMMM y").replace("!", fromOrdinal);

  const applyOrdinal = (template: string, ordinal: string): string =>
    template.replace("!", ordinal);
  const toOrdinal = getDateOrdinal(to.day);
  const toString = applyOrdinal(` to ${to.toFormat("d! MMMM y")}`, toOrdinal);

  if (from.year !== to.year) {
    return applyOrdinal(
      `${from.toFormat("d! MMMM y")}${toString}`,
      fromOrdinal
    );
  }
  if (from.month !== to.month) {
    return applyOrdinal(`${from.toFormat("d! MMMM")}${toString}`, fromOrdinal);
  }
  return applyOrdinal(`${from.toFormat("d!")}${toString}`, fromOrdinal);
};
