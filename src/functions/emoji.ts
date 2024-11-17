import { Emoji } from "../types/emoji";

/**
 * Extracts an emoji prefix from a string.
 * @param text A string that may have one of more emoji at its start, followed by a space.
 * @returns Object containing the separated title and emoji, if one or more were present.
 */
export const splitEmojiFromTitle = (
  text: string
): { emoji?: Emoji; title: string } => {
  const startIsText = /^[A-ZÖ]/i;
  if (startIsText.test(text)) return { title: text };

  const textParts = text.split(" ");
  const emoji = Emoji.parse(textParts[0]);
  const title = textParts.slice(1).join(" ");

  return { emoji, title };
};
