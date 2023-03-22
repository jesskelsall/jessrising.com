import { startCase } from "lodash/fp";
import Image from "next/image";
import Link from "next/link";
import { getImageSrcFromSlug } from "../../functions/image";
import { IMarkdownData } from "../../types/markdown";

interface IGalleryGridProps {
  galleryPhotos: IMarkdownData[];
}

export const GalleryGrid = ({ galleryPhotos }: IGalleryGridProps) => (
  <div className="gallery-grid">
    {galleryPhotos.map(({ slug }) => (
      <Link href={`/gallery/p/${slug}`} key={slug}>
        <Image
          alt={startCase(slug)}
          src={getImageSrcFromSlug(slug)}
          height="375"
          width="500"
        />
      </Link>
    ))}
  </div>
);
