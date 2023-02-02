import { DateTime } from "luxon";
import { SEPARATOR } from "../consts";

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

export const longDate = (date: DateTime): string => {
  const ordinal = ORDINALS[date.day % 10] || ORDINALS[0];
  return date.toFormat("d! MMMM y").replace("!", ordinal);
};

export const parseEXIFDate = (
  dateString: string | undefined
): DateTime | undefined => dateFromString(dateString, "yyyy:MM:dd HH:mm:ss");

export const formatFullDate = (date: DateTime): string =>
  `${longDate(date)}${SEPARATOR}${date.toISOWeekDate()}`;
