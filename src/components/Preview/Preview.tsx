import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { useGalleryPhotoSlugs } from "../../context/galleryPhotoSlugs";
import { formatLongDate } from "../../functions/date";
import { getImageSrcFromSlug } from "../../functions/image";
import { GalleryPhotoSlug } from "../../types/galleryPhoto";
import { IMarkdownData } from "../../types/markdownOld";

export const Preview = ({
  date,
  dateEnd,
  description,
  href,
  imageSlug,
  title,
}: {
  date?: string;
  dateEnd?: string;
  description?: string;
  href: string;
  imageSlug?: string;
  title: string;
}) => (
  <li>
    <div>
      <h2>
        <Link href={href}>{title}</Link>
      </h2>
      {date && (
        <p className="date">
          <em>{formatLongDate(DateTime.fromISO(date))}</em>
          {dateEnd && (
            <>
              {" to "}
              {formatLongDate(DateTime.fromISO(dateEnd))}
            </>
          )}
        </p>
      )}
      {description && <p className="summary">{description}</p>}
    </div>
    {imageSlug && (
      <Image src={imageSlug} alt={title} width={200} height={150} />
    )}
  </li>
);

export const BlogPreview = ({ blogPost }: { blogPost: IMarkdownData }) => {
  const galleryPhotoSlugs = useGalleryPhotoSlugs();
  const { date, slug, summary } = blogPost;

  let imageSlug: string | undefined;
  if (summary.imageSlug) {
    const isGalleryPhoto = galleryPhotoSlugs.includes(
      GalleryPhotoSlug.parse(summary.imageSlug)
    );

    imageSlug = getImageSrcFromSlug(
      summary.imageSlug,
      isGalleryPhoto ? PHOTO_SIZE_SUFFIX.SMALL : ""
    );
  }

  return (
    <Preview
      date={date}
      description={summary.paragraph}
      href={`/blog/p/${slug}`}
      imageSlug={imageSlug}
      title={summary.heading || "Blog Post"}
    />
  );
};
