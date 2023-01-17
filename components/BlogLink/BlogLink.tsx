import Link from "next/link";
import { SEPARATOR } from "../../consts";
import { IMarkdownData } from "../../types";

interface IBlogLinkProps {
  blogPost: IMarkdownData;
}

export const BlogLink = ({ blogPost }: IBlogLinkProps) => {
  const { date, slug, summary } = blogPost;

  return (
    <li>
      <Link href={`/blog/p/${slug}`}>{summary.heading || slug}</Link>
      {date && (
        <>
          {SEPARATOR}
          {date}
        </>
      )}
    </li>
  );
};
