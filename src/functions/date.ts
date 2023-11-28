import { DateTime } from "luxon";

// Parses the given date in the given format as a Luxon DateTime object
// Returns undefined if an invalid date or no date value
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

// dateFromString wrapper for EXIF date format
export const dateFromEXIFString = (
  dateString: string | undefined
): DateTime | undefined => dateFromString(dateString, "yyyy:MM:dd HH:mm:ss");

// Get a date prefixed to the given slug, if one is present
export const dateFromSlug = (slug: string): DateTime | undefined => {
  const dateString = slug.slice(0, 10);
  return dateFromString(dateString);
};

// Returns the English ordinal to use for the given day of the month
export const getDateOrdinal = (day: number): string => {
  const ordinals = ["th", "st", "nd", "rd"];

  if (day >= 11 && day <= 13) return ordinals[0];
  return ordinals[day % 10] || ordinals[0];
};

// Express a date range in human readable form with no repetition
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
