import { DateTime } from "luxon";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { useGalleryPhotoSlugs } from "../context/galleryPhotoSlugs";
import { formatDateRange } from "../functions/date";
import { getImageSrcFromSlug } from "../functions/image";
import { GalleryPhotoSlug } from "../types/brand";
import { IMarkdownData } from "../types/markdownOld";
import { Trip } from "../types/trip";

export const Preview = ({
  date,
  dateEnd,
  description,
  emoji,
  href,
  imageSlug,
  title,
}: {
  date?: string;
  dateEnd?: string;
  description?: string;
  emoji?: string;
  href: string;
  imageSlug?: string;
  title: string;
}) => (
  <li className="flex gap-4">
    <div className="flex grow flex-col">
      <h2 className="m-0">
        {emoji && (
          <span className="cursor-default select-none">{emoji}&nbsp;</span>
        )}
        <Link href={href}>{title}</Link>
      </h2>
      {date && (
        <p className="my-4 italic">
          {formatDateRange(
            DateTime.fromISO(date),
            dateEnd ? DateTime.fromISO(dateEnd) : undefined
          )}
        </p>
      )}
      {description && <p className="m-0">{description}</p>}
    </div>
    {imageSlug && (
      <Link href={href}>
        <img
          alt={title}
          className="max-h-full w-[200px] max-w-none"
          src={imageSlug}
        />
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
  const { dates, description, emoji, slug, thumbnail, title } = trip;

  const imageSlug = getImageSrcFromSlug(thumbnail, PHOTO_SIZE_SUFFIX.SMALL);

  return (
    <Preview
      date={dates.from}
      dateEnd={dates.to}
      description={description || undefined}
      emoji={emoji}
      href={`/gallery?trip=${slug}`}
      imageSlug={imageSlug}
      title={title}
    />
  );
};
