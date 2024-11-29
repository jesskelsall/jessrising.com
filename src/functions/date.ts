import { DateTime } from "luxon";

/**
 * Parses a date in the provided format or throws an error.
 * @param dateString Date string to format.
 * @param format Luxon date parse format. Defaults to ISO.
 * @returns Parsed DateTime object.
 */
export const dateFromString = (
  dateString: string,
  format?: string
): DateTime => {
  const date = format
    ? DateTime.fromFormat(dateString, format)
    : DateTime.fromISO(dateString);

  if (!date.isValid) throw new Error(`Date could not be parsed: ${dateString}`);
  return date;
};

/**
 * Calls dateFromString with the EXIF date format.
 * @param dateString EXIF date string to be parsed.
 * @returns Parsed DateTime object.
 */
export const dateFromEXIFString = (dateString: string): DateTime =>
  dateFromString(dateString, "yyyy:MM:dd HH:mm:ss");

/**
 * Extract a date prefixed to a slug, if one is present.
 * @param slug Blog post slug.
 * @returns Parsed date or undefined if a valid ISO date is not present at the start of the slug.
 */
export const dateFromSlug = (slug: string): DateTime | undefined => {
  const prefixRegExp = /^(\d{4}-\d{2}-\d{2})/;
  const prefixMatch = slug.match(prefixRegExp);

  if (prefixMatch === null) return undefined;
  return dateFromString(prefixMatch[0]);
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
