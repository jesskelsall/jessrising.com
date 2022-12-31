import { DateTime } from "luxon";
import { IGalleryPhoto } from "../types";

const ORDINALS = ["th", "st", "nd", "rd"];

export const dateFromSlug = (slug: string): DateTime | undefined => {
  const dateString = slug.slice(0, 10);
  const date = DateTime.fromISO(dateString).setLocale("en-GB");

  return Number.isNaN(date.toJSDate()) ? undefined : date;
};

export const longDate = (date: DateTime): string => {
  const ordinal = ORDINALS[date.day % 10] || ORDINALS[0];
  return date.toFormat("d! MMMM y").replace("!", ordinal);
};

export const parseEXIFDate = (date: string): DateTime =>
  DateTime.fromFormat(date, "yyyy:MM:dd HH:mm:ss");

// Sort gallery photos chronologically
// Any photos with no date are placed at the end of the array
export const sortGalleryPhotosByDate = (
  a: IGalleryPhoto,
  b: IGalleryPhoto
): number => {
  if (a.metaData.date === undefined) return 1;
  if (b.metaData.date === undefined) return -1;

  const aDate = parseEXIFDate(a.metaData.date);
  const bDate = parseEXIFDate(b.metaData.date);

  if (aDate > bDate) return 1;
  if (aDate < bDate) return -1;
  return 0;
};
