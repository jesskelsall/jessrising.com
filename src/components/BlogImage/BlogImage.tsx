import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { useGalleryPhotoSlugs } from "../../context/galleryPhotoSlugs";
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
  const galleryPhotoSlugs = useGalleryPhotoSlugs();
  const photoSlug = parsePhotoSlugFromSrc(src);

  const isGalleryPhoto = forceGallery || galleryPhotoSlugs.includes(photoSlug);
  const imageSrcSuffix = isGalleryPhoto ? PHOTO_SIZE_SUFFIX.LARGE : "";

  const image = (
    <img
      src={getImageSrcFromSlug(photoSlug, imageSrcSuffix)}
      alt={alt}
      style={{
        width: 800,
        maxWidth: "100%",
      }}
    />
  );

  return (
    <>
      {isGalleryPhoto ? (
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
