import { z } from "zod";
import { dateFromString } from "../functions/date";

export const ISODateString = z.custom<string>((dateString) => {
  if (typeof dateString !== "string") return false;
  const date = dateFromString(dateString);
  return date?.isValid;
}, "Must be a valid ISO date string");
