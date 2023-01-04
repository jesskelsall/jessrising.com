interface IMarkdownTagsProps {
  tags: string[];
}

export const MarkdownTags = ({ tags }: IMarkdownTagsProps) => (
  <li>Tags: {tags.join(", ")}</li>
);
