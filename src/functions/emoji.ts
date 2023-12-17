import { Emoji } from "../types/emoji";

const startIsText = /^[A-Z]/i;

// Extracts an emoji prefix from a string
export const splitEmojiFromTitle = (
  text: string
): { emoji?: Emoji; title: string } => {
  if (startIsText.test(text)) return { title: text };

  const textParts = text.split(" ");
  const emoji = Emoji.parse(textParts[0]);
  const title = textParts.slice(1).join(" ");

  return { emoji, title };
};
