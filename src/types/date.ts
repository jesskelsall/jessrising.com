import { z } from "zod";
import { dateFromString } from "../functions/date";

export const ISODateString = z.custom<string>((dateString) => {
  if (typeof dateString !== "string") return "Must be a string";
  const date = dateFromString(dateString);
  return date?.isValid ? true : "Invalid ISO date string";
});
