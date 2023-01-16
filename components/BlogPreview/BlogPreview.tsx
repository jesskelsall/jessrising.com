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
    <div style={{ display: "flex", marginBottom: 30 }}>
      <div>
        <h2 style={{ marginTop: 0 }}>
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
      </div>
      {summary.imageSlug && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`photos/${summary.imageSlug}.jpeg`}
          alt={summary.heading}
          style={{ maxHeight: 150, maxWidth: 200 }}
        />
      )}
    </div>
  );
};
