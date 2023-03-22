import Link from "next/link";
import { useGalleryPhotos } from "../../context/galleryPhotos";
import { getImageSrcFromSlug } from "../../functions/image";
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

  const image = (
    <img
      src={getImageSrcFromSlug(photoSlug)}
      alt={alt}
      style={{
        width: 800,
        maxWidth: "100%",
      }}
    />
  );

  // Check for matching gallery photo
  const linkToGalleryPhoto: boolean =
    forceGallery ||
    Boolean(allGalleryPhotos.find((photo) => photoSlug === photo.slug));

  return (
    <>
      {linkToGalleryPhoto ? (
        <Link href={`/gallery/p/${photoSlug}`}>{image}</Link>
      ) : (
        image
      )}
      {caption && (
        <p>
          <em>{caption}</em>
        </p>
      )}
    </>
  );
};
