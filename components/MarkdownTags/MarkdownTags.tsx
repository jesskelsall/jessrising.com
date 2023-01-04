import { kebabCase } from "lodash/fp";
import Link from "next/link";
import React from "react";

interface IMarkdownTagsProps {
  tags: string[];
}

export const MarkdownTags = ({ tags }: IMarkdownTagsProps) => (
  <li>
    Tags:{" "}
    {tags.map((tag, index) => {
      const tagSlug = kebabCase(tag);

      return (
        <React.Fragment key={tagSlug}>
          {index !== 0 && ", "}
          <Link href={`/gallery?t=${tagSlug}`}>{tag}</Link>
        </React.Fragment>
      );
    })}
  </li>
);
