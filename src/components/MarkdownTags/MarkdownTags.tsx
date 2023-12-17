import { kebabCase } from "lodash/fp";
import { PillRow } from "../PillRow/PillRow";

interface IMarkdownTagsProps {
  tags: string[];
}

export const MarkdownTags = ({ tags }: IMarkdownTagsProps) => {
  const pills = tags.map((tag) => ({
    href: `/gallery?tag=${kebabCase(tag)}`,
    title: tag,
  }));

  return (
    <li>
      Tags: <PillRow pills={pills} />
    </li>
  );
};
