import { z } from "zod";
import { MarkdownString } from "./markdown";

export type ContentType = "blog" | "photos" | "trips";

export const Content = z.object({
  slug: z.string(),
  markdown: MarkdownString.optional(),
});
export type Content = z.infer<typeof Content>;
