import Link from "next/link";
import { SEPARATOR } from "../../consts/text";
import { IMarkdownData } from "../../types/markdownOld";

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
