import { APP_AUTHOR } from "@/consts/app";
import { TagTitle } from "@/types/tag";
import { startCase } from "lodash/fp";
import Markdown from "markdown-to-jsx";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { useGalleryPhoto } from "../context/galleryPhoto";
import { getImageSrcFromSlug } from "../functions/image";
import { GalleryPhotoDetails } from "./GalleryPhotoDetails";
import { LinkButton } from "./LinkButton";

export const GalleryPhoto = () => {
  const { markdown, meta, settings, slug, title } = useGalleryPhoto();

  const imagePath = getImageSrcFromSlug(slug, PHOTO_SIZE_SUFFIX.LARGE);
  const originalImagePath = getImageSrcFromSlug(
    slug,
    PHOTO_SIZE_SUFFIX.ORIGINAL
  );

  const hasForYouTag = meta.tags.includes(TagTitle.parse("For You"));

  return (
    <main className="mx-auto w-full px-2 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div className="mx-auto flex max-w-full justify-center md:mt-10">
        <img
          className="max-h-[90vh] max-w-[calc(100%+16px)] md:max-w-full"
          alt={startCase(slug)}
          src={imagePath}
        />
      </div>
      <h1>{title}</h1>
      <GalleryPhotoDetails />
      {settings?.downloadOriginal && (
        <LinkButton href={originalImagePath}>
          Download high resolution photo
        </LinkButton>
      )}
      {hasForYouTag && (
        <p className="italic">
          Photo by {APP_AUTHOR}. Free to use in any way. If using this photo
          commercially, please credit by name.
        </p>
      )}
      {markdown && <Markdown>{markdown}</Markdown>}
    </main>
  );
};
