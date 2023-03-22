import Link from "next/link";
import path from "path";
import { useGalleryPhotos } from "../../context/galleryPhotos";
import { parsePhotoSlugFromSrc } from "../../functions/markdown";

interface IBlogImageProps {
  alt: string;
  caption?: string;
  forceGallery?: boolean;
  src: string;
}

// Display an image in a blog post
// Links to the gallery photo if available, otherwise the image itself
export const BlogImage = ({
  alt,
  caption,
  forceGallery,
  src,
}: IBlogImageProps) => {
  const allGalleryPhotos = useGalleryPhotos();
  const photoSlug = parsePhotoSlugFromSrc(src);

  // Check for matching gallery photo
  const galleryPhoto = allGalleryPhotos.find(
    (photo) => photoSlug === photo.slug
  );

  const imagePath = path.join("/photos", `${photoSlug}.jpeg`);
  const href =
    galleryPhoto || forceGallery ? `/gallery/p/${photoSlug}` : imagePath;

  return (
    <>
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
      {caption && (
        <p>
          <em>{caption}</em>
        </p>
      )}
    </>
  );
};
