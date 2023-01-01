import Link from "next/link";
import { SEPARATOR } from "../../consts";
import { IBlogPost } from "../../types";
import { dateFromSlug, getMarkdownTitle } from "../../functions";

export const BlogLink = ({ markdown, slug }: IBlogPost) => {
  const date = dateFromSlug(slug);
  const title = getMarkdownTitle(markdown);

  return (
    <li>
      <Link href={`/blog/${slug}`}>{title}</Link>
      {date && (
        <>
          {SEPARATOR}
          {date.toISODate()}
        </>
      )}
    </li>
  );
};
