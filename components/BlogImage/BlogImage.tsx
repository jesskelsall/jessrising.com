/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import path from "path";
import { useGalleryPhotos } from "../../context";

interface IBlogImageProps {
  alt: string;
  src: string;
}

// Display an image in a blog post
// Links to the gallery photo if available, otherwise the image itself
export const BlogImage = ({ alt, src }: IBlogImageProps) => {
  const allGalleryPhotos = useGalleryPhotos();
  const imageFileName = src.split("/").reverse()[0];

  // Check for matching gallery photo
  const photoSlug = imageFileName.replace(".jpeg", "");
  const galleryPhoto = allGalleryPhotos.find(
    (photo) => photoSlug === photo.slug
  );

  const imagePath = path.join("/photos", imageFileName);
  const href = galleryPhoto
    ? path.join("/gallery", photoSlug)
    : path.join("/photos", imageFileName);

  return (
    <Link href={href}>
      <img
        src={imagePath}
        alt={alt}
        style={{
          width: 800,
          maxWidth: "100%",
        }}
      />
    </Link>
  );
};
