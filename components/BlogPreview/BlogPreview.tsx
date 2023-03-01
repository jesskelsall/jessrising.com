import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { formatLongDate } from "../../functions/date";
import { IMarkdownData } from "../../types/markdown";

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
        <Image
          src={`/photos/${summary.imageSlug}.jpeg`}
          alt={summary.heading || ""}
          width={200}
          height={150}
        />
      )}
    </li>
  );
};
