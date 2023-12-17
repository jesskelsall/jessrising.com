import { z } from "zod";
import { Emoji } from "./emoji";

export const TagTitle = z.string().brand<"TagTitle">();
export type TagTitle = z.infer<typeof TagTitle>;

export const TagRaw = z.object({
  emoji: z.string().optional(),
  hidePhotos: z.boolean().optional(), // Hide photos with this tag unless it is applied as a filter
  title: z.string(),
});
export type TagRaw = z.infer<typeof TagRaw>;

export const Tag = TagRaw.extend({
  emoji: Emoji.optional(),
  index: z.number(),
  slug: z.string(),
  title: TagTitle,
});
export type Tag = z.infer<typeof Tag>;

export const TagsDict = z.record(z.string(), Tag);
export type TagsDict = z.infer<typeof TagsDict>;
