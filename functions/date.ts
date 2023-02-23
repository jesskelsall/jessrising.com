import { DateTime } from "luxon";
import { IMarkdownData } from "../types";

const ORDINALS = ["th", "st", "nd", "rd"];

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

export const dateFromSlug = (slug: string): DateTime | undefined => {
  const dateString = slug.slice(0, 10);
  return dateFromString(dateString);
};

export const formatLongDate = (date: DateTime): string => {
  let [ordinal] = ORDINALS;
  if (date.day < 11 && date.day > 13) {
    ordinal = ORDINALS[date.day % 10] || ORDINALS[0];
  }

  return date.toFormat("d! MMMM y").replace("!", ordinal);
};

// Convert EXIF date string to Luxon DateTime object
export const parseEXIFDate = (
  dateString: string | undefined
): DateTime | undefined => dateFromString(dateString, "yyyy:MM:dd HH:mm:ss");

export const getPhotoDate = (photo: IMarkdownData): DateTime | undefined =>
  parseEXIFDate(photo.meta.photo?.date);
