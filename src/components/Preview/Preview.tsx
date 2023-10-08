import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { useGalleryPhotoSlugs } from "../../context/galleryPhotoSlugs";
import { formatLongDate } from "../../functions/date";
import { getImageSrcFromSlug } from "../../functions/image";
import { GalleryPhotoSlug } from "../../types/brand";
import { IMarkdownData } from "../../types/markdownOld";
import { Trip } from "../../types/trip";

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
          {formatLongDate(DateTime.fromISO(date))}
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
      <Link href={href}>
        <Image src={imageSlug} alt={title} width={200} height={150} />
      </Link>
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

export const TripPreview = ({ trip }: { trip: Trip }) => {
  const { dates, description, slug, thumbnail, title } = trip;

  const imageSlug = getImageSrcFromSlug(thumbnail, PHOTO_SIZE_SUFFIX.SMALL);

  return (
    <Preview
      date={dates.from}
      dateEnd={dates.to}
      description={description || undefined}
      href={`/gallery?trip=${slug}`}
      imageSlug={imageSlug}
      title={title}
    />
  );
};
