import { z } from "zod";

export type LocationHierarchy = {
  [location: string]: LocationHierarchy;
};

export const Location = z.string().brand<"Location">();
export type Location = z.infer<typeof Location>;
