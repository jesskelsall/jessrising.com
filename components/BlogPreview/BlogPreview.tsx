import Link from "next/link";
import {
  dateFromSlug,
  formatFullDate,
  getMarkdownFirstParagraph,
  getMarkdownTitle,
} from "../../functions";
import { IBlogPost } from "../../types";

interface IBlogPreviewProps {
  blogPost: IBlogPost;
}

export const BlogPreview = ({ blogPost }: IBlogPreviewProps) => {
  const { slug, markdown } = blogPost;
  const date = dateFromSlug(slug);
  const title = getMarkdownTitle(markdown);
  const intro = getMarkdownFirstParagraph(markdown);

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
