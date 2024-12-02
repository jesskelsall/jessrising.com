import { kebabCase, orderBy } from "lodash/fp";
import { tagsDict } from "../data/tagsDict";
import { applyFilterQueries } from "../functions/filter";
import { Tag } from "../types/tag";
import { BlogListItem } from "./BlogList";
import { PillRow } from "./PillRow";

interface IMarkdownTagsProps {
  tags: string[];
}

export const MarkdownTags = ({ tags }: IMarkdownTagsProps) => {
  const orderedTags = orderBy(
    ["index"],
    ["asc"],
    tags.map((tag) => tagsDict[tag]).filter((tag) => tag)
  );

  const filteredTags = applyFilterQueries<Tag>(orderedTags, [
    [[false], (tag) => [tag.hideTag === true]],
  ]);

  if (!filteredTags.length) return null;

  const pills = filteredTags.map((tag) => ({
    emoji: tag.emoji,
    href: `/gallery?tag=${kebabCase(tag.title)}`,
    title: tag.title,
  }));

  return (
    <BlogListItem>
      Tags: <PillRow pills={pills} />
    </BlogListItem>
  );
};
