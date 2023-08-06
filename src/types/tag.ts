import { z } from "zod";

export const TagId = z.string().brand<"Tag">();
export type TagId = z.infer<typeof TagId>;

export const Tag = z.object({
  id: TagId,
  hidePhotos: z.boolean().optional(), // Hide photos with this tag unless it is applied as a filter
});
export type Tag = z.infer<typeof Tag>;
