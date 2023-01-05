import { DateTime } from "luxon";
import { SEPARATOR } from "../consts";

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

export const formatFullDate = (date: DateTime): string =>
  `${longDate(date)}${SEPARATOR}${date.toISOWeekDate()}`;
