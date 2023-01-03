import { DateTime } from "luxon";
import { SEPARATOR } from "../consts";
import { IMarkdownData } from "../types";

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
  a: IMarkdownData,
  b: IMarkdownData
): number => {
  if (a.meta.photo?.date === undefined) return 1;
  if (b.meta.photo?.date === undefined) return -1;

  const aDate = parseEXIFDate(a.meta.photo.date);
  const bDate = parseEXIFDate(b.meta.photo.date);

  if (aDate > bDate) return 1;
  if (aDate < bDate) return -1;
  return 0;
};

export const formatFullDate = (date: DateTime): string =>
  `${longDate(date)}${SEPARATOR}${date.toISOWeekDate()}`;
