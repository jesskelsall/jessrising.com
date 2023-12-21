import { kebabCase, keyBy } from "lodash/fp";
import { Emoji } from "../types/emoji";
import { TagRaw, TagTitle, TagsDict } from "../types/tag";

/**
 * Converts tags data into a dictionary of Tag objects.
 * @returns Object of Tags using tag titles for keys.
 */
export const computeTags = (allTags: TagRaw[]): TagsDict =>
  keyBy(
    "title",
    allTags.map((tag, index) => ({
      ...tag,
      title: TagTitle.parse(tag.title),
      slug: kebabCase(tag.title),
      emoji: tag.emoji ? Emoji.parse(tag.emoji) : undefined,
      index,
    }))
  );
