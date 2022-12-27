import Link from "next/link";
import { SEPARATOR } from "../../consts";
import { IBlogPost } from "../../types";
import { dateFromSlug, getBlogPostTitle } from "../../functions";

export const BlogPreview = ({ markdown, slug }: IBlogPost) => {
  const date = dateFromSlug(slug);
  const title = getBlogPostTitle(markdown);

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
