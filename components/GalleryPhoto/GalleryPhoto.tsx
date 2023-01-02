/* eslint-disable @next/next/no-img-element */

import { startCase } from "lodash/fp";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import path from "path";
import { IGalleryPhoto } from "../../types";

interface IGalleryPhotoProps {
  galleryPhoto: IGalleryPhoto;
}

export const GalleryPhoto = ({ galleryPhoto }: IGalleryPhotoProps) => {
  const { slug } = galleryPhoto;
  const imagePath = path.join("/photos", `${slug}.jpeg`);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Link href={imagePath}>
        <img
          alt={startCase(slug)}
          src={imagePath}
          style={{
            width: 1200,
            maxWidth: "100%",
          }}
        />
      </Link>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Markdown>{galleryPhoto.markdown}</Markdown>
      </div>
    </div>
  );
};
