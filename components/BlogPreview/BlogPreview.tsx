import Link from "next/link";
import {
  dateFromSlug,
  formatFullDate,
  getBlogPostIntro,
  getBlogPostTitle,
} from "../../functions";
import { IBlogPost } from "../../types";

interface IBlogPreviewProps {
  blogPost: IBlogPost;
}

export const BlogPreview = ({ blogPost }: IBlogPreviewProps) => {
  const { slug, markdown } = blogPost;
  const date = dateFromSlug(slug);
  const title = getBlogPostTitle(markdown);
  const intro = getBlogPostIntro(markdown);

  return (
    <>
      <h2>
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p>
        {date && (
          <>
            <em>{formatFullDate(date)}</em>
            <br />
          </>
        )}
        {intro}
      </p>
    </>
  );
};
