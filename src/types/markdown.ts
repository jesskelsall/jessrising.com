import { z } from "zod";

export const MarkdownString = z.string().brand<"Markdown">();
export type MarkdownString = z.infer<typeof MarkdownString>;
