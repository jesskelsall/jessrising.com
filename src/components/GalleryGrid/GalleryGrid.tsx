import Image from "next/image";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { getImageSrcFromSlug } from "../../functions/image";
import { GalleryPhoto } from "../../types/galleryPhoto";

interface IGalleryGridProps {
  galleryPhotos: GalleryPhoto[];
}

export const GalleryGrid = ({ galleryPhotos }: IGalleryGridProps) => (
  <div className="gallery-grid">
    {galleryPhotos.map(({ exif, slug, title }) => {
      const { dimensions } = exif;
      const isLandscape = dimensions
        ? dimensions.width >= dimensions.height
        : true;

      return (
        <Link href={`/gallery/p/${slug}`} key={slug}>
          <Image
            alt={title}
            className={isLandscape ? "landscape" : "portrait"}
            src={getImageSrcFromSlug(slug, PHOTO_SIZE_SUFFIX.SMALL)}
            height="375"
            width="500"
          />
        </Link>
      );
    })}
  </div>
);
