import { DateTime } from "luxon";
import Link from "next/link";
import { formatFullDate } from "../../functions";
import { IMarkdownData } from "../../types";

interface IBlogPreviewProps {
  blogPost: IMarkdownData;
}

export const BlogPreview = ({ blogPost }: IBlogPreviewProps) => {
  const { date, slug, summary } = blogPost;

  return (
    <>
      <h2>
        <Link href={`/blog/p/${slug}`}>{summary.heading}</Link>
      </h2>
      <p>
        {date && (
          <>
            <em>{formatFullDate(DateTime.fromISO(date))}</em>
            <br />
          </>
        )}
        {summary.paragraph}
      </p>
    </>
  );
};
