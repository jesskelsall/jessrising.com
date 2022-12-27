import { DateTime } from "luxon";

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
