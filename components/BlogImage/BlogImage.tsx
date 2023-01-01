/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import path from "path";
import { useGalleryPhotos } from "../../context";
import { photoSlugFromSrc } from "../../functions";

interface IBlogImageProps {
  alt: string;
  src: string;
}

// Display an image in a blog post
// Links to the gallery photo if available, otherwise the image itself
export const BlogImage = ({ alt, src }: IBlogImageProps) => {
  const allGalleryPhotos = useGalleryPhotos();
  const photoSlug = photoSlugFromSrc(src);

  // Check for matching gallery photo
  const galleryPhoto = allGalleryPhotos.find(
    (photo) => photoSlug === photo.slug
  );

  const imagePath = path.join("/photos", `${photoSlug}.jpeg`);
  const href = galleryPhoto ? path.join("/gallery", photoSlug) : imagePath;

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
