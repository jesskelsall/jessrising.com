import { z } from "zod";
import { Emoji } from "./emoji";

export type LocationHierarchy = {
  [location: string]: LocationHierarchy;
};

// LocationHierarchy key without the emoji prefix
export const LocationTitle = z.string().brand<"LocationTitle">();
export type LocationTitle = z.infer<typeof LocationTitle>;

// Computed location emoji and title
export const Location = z.object({
  emoji: Emoji.optional(),
  slug: z.string(),
  title: LocationTitle,
  parent: LocationTitle.optional(),
});
export type Location = z.infer<typeof Location>;

export const LocationsDict = z.record(z.string(), Location);
export type LocationsDict = z.infer<typeof LocationsDict>;
