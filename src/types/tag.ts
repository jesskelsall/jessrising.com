import { z } from "zod";

export const Tag = z.string().brand<"Tag">();
export type Tag = z.infer<typeof Tag>;
