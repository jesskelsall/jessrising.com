import { startCase } from "lodash/fp";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { IMarkdownData } from "../../types";

interface IGalleryGridProps {
  galleryPhotos: IMarkdownData[];
}

export const GalleryGrid = ({ galleryPhotos }: IGalleryGridProps) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
    {galleryPhotos.map(({ slug }) => {
      const imagePath = path.join("/photos", `${slug}.jpeg`);

      return (
        <Link href={`/gallery/p/${slug}`} key={slug}>
          <div
            style={{
              height: 375,
              position: "relative",
              width: 500,
            }}
          >
            <Image alt={startCase(slug)} src={imagePath} fill />
          </div>
        </Link>
      );
    })}
  </div>
);
