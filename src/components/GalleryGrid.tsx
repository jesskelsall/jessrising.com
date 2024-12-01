import Image from "next/image";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { getImageSrcFromSlug } from "../functions/image";
import { GalleryPhoto } from "../types/galleryPhoto";

interface IGalleryGridProps {
  galleryPhotos: GalleryPhoto[];
}

export const GalleryGrid = ({ galleryPhotos }: IGalleryGridProps) => (
  <div className="gallery-grid">
    {galleryPhotos.map(({ exif, slug, title }) => {
      const { height, width } = exif.dimensions;
      const ratio = width / height;
      const isLandscape = ratio >= 1;
      const otherDimension = Math.round(500 / ratio);

      return (
        <Link href={`/gallery/p/${slug}`} key={slug}>
          <Image
            alt={title}
            className={isLandscape ? "landscape" : "portrait"}
            src={getImageSrcFromSlug(slug, PHOTO_SIZE_SUFFIX.SMALL)}
            height={isLandscape ? otherDimension : 500}
            width={isLandscape ? 500 : otherDimension}
          />
        </Link>
      );
    })}
  </div>
);
