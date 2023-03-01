import { startCase } from "lodash/fp";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { IMarkdownData } from "../../types/markdown";

interface IGalleryGridProps {
  galleryPhotos: IMarkdownData[];
}

export const GalleryGrid = ({ galleryPhotos }: IGalleryGridProps) => (
  <div className="gallery-grid">
    {galleryPhotos.map(({ slug }) => {
      const imagePath = path.join("/photos", `${slug}.jpeg`);

      return (
        <Link href={`/gallery/p/${slug}`} key={slug}>
          <Image
            alt={startCase(slug)}
            src={imagePath}
            height="375"
            width="500"
          />
        </Link>
      );
    })}
  </div>
);
