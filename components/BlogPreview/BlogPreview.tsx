import { DateTime } from "luxon";
import Link from "next/link";
import { formatLongDate } from "../../functions";
import { IMarkdownData } from "../../types";

interface IBlogPreviewProps {
  blogPost: IMarkdownData;
}

export const BlogPreview = ({ blogPost }: IBlogPreviewProps) => {
  const { date, slug, summary } = blogPost;

  return (
    <li>
      <div>
        <h2>
          <Link href={`/blog/p/${slug}`}>{summary.heading}</Link>
        </h2>
        {date && (
          <p className="date">
            <em>{formatLongDate(DateTime.fromISO(date))}</em>
          </p>
        )}
        <p className="summary">{summary.paragraph}</p>
      </div>

      {summary.imageSlug && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`photos/${summary.imageSlug}.jpeg`}
          alt={summary.heading}
          style={{ maxHeight: 150, maxWidth: 200 }}
        />
      )}
    </li>
  );
};
