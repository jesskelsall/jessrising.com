import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { useGalleryPhotoSlugs } from "../../context/galleryPhotoSlugs";
import { formatLongDate } from "../../functions/date";
import { getImageSrcFromSlug } from "../../functions/image";
import { GalleryPhotoSlug } from "../../types/galleryPhoto";
import { IMarkdownData } from "../../types/markdownOld";

interface IBlogPreviewProps {
  blogPost: IMarkdownData;
}

export const BlogPreview = ({ blogPost }: IBlogPreviewProps) => {
  const galleryPhotoSlugs = useGalleryPhotoSlugs();
  const { date, slug, summary } = blogPost;
  const { imageSlug } = summary;

  let image: JSX.Element | null = null;

  if (imageSlug) {
    const isGalleryPhoto =
      imageSlug && galleryPhotoSlugs.includes(imageSlug as GalleryPhotoSlug);

    image = (
      <Image
        src={getImageSrcFromSlug(
          imageSlug,
          isGalleryPhoto ? PHOTO_SIZE_SUFFIX.SMALL : ""
        )}
        alt={summary.heading || ""}
        width={200}
        height={150}
      />
    );
  }

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
      {image}
    </li>
  );
};
