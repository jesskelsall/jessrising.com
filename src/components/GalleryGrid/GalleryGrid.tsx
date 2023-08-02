import { startCase } from "lodash/fp";
import Image from "next/image";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { getImageSrcFromSlug } from "../../functions/image";
import { IMarkdownData } from "../../types/markdownOld";

interface IGalleryGridProps {
  galleryPhotos: IMarkdownData[];
}

export const GalleryGrid = ({ galleryPhotos }: IGalleryGridProps) => (
  <div className="gallery-grid">
    {galleryPhotos.map(({ slug, summary }) => (
      <Link href={`/gallery/p/${slug}`} key={slug}>
        <Image
          alt={summary.heading || startCase(slug)}
          src={getImageSrcFromSlug(slug, PHOTO_SIZE_SUFFIX.SMALL)}
          height="375"
          width="500"
        />
      </Link>
    ))}
  </div>
);
