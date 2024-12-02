import { startCase } from "lodash/fp";
import Markdown from "markdown-to-jsx";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { useGalleryPhoto } from "../context/galleryPhoto";
import { getImageSrcFromSlug } from "../functions/image";
import { GalleryHeading } from "./GalleryHeading";

export const GalleryPhoto = () => {
  const { markdown, slug } = useGalleryPhoto();

  const imagePath = getImageSrcFromSlug(slug, PHOTO_SIZE_SUFFIX.LARGE);

  return (
    <main className="mx-auto w-full px-2 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
      <div className="mx-auto flex justify-center md:mt-10">
        <img
          className="max-h-[90vh] max-w-full"
          alt={startCase(slug)}
          src={imagePath}
        />
      </div>
      <GalleryHeading />
      {markdown && <Markdown>{markdown}</Markdown>}
    </main>
  );
};
