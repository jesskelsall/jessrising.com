import Link from "next/link";
import { SEPARATOR } from "../../consts";
import { IMarkdownData } from "../../types";

interface IBlogLinkProps {
  blogPost: IMarkdownData;
}

export const BlogLink = ({ blogPost }: IBlogLinkProps) => {
  const { date, first, slug } = blogPost;

  return (
    <li>
      <Link href={`/blog/p/${slug}`}>{first.heading || slug}</Link>
      {date && (
        <>
          {SEPARATOR}
          {date}
        </>
      )}
    </li>
  );
};
