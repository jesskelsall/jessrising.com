import { DateTime } from "luxon";
import { GalleryPhoto } from "../types/galleryPhoto";

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

// dateFromString wrapper for IMarkdownData optional chaining
export const dateFromGalleryPhoto = (
  photo: GalleryPhoto
): DateTime | undefined => dateFromString(photo.exif.date);

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

// Output the given date in the typical UK long format
export const formatLongDate = (date: DateTime): string => {
  const ordinal = getDateOrdinal(date.day);
  return date.toFormat("d! MMMM y").replace("!", ordinal);
};
