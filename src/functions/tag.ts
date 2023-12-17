import { kebabCase, keyBy } from "lodash/fp";
import { allTags } from "../data/tags";
import { Emoji } from "../types/emoji";
import { TagTitle, TagsDict } from "../types/tag";

export const computeTags = (): TagsDict =>
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
