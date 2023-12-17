import { z } from "zod";

export const Emoji = z.string().emoji().brand<"Emoji">();
export type Emoji = z.infer<typeof Emoji>;
