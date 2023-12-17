import { kebabCase, orderBy } from "lodash/fp";
import { tagsDict } from "../../data/tagsDict";
import { PillRow } from "../PillRow/PillRow";

interface IMarkdownTagsProps {
  tags: string[];
}

export const MarkdownTags = ({ tags }: IMarkdownTagsProps) => {
  const orderedTags = orderBy(
    ["index"],
    ["asc"],
    tags.map((tag) => tagsDict[tag]).filter((tag) => tag)
  );

  const pills = orderedTags.map((tag) => ({
    emoji: tag.emoji,
    href: `/gallery?tag=${kebabCase(tag.title)}`,
    title: tag.title,
  }));

  return (
    <li>
      Tags: <PillRow pills={pills} />
    </li>
  );
};
