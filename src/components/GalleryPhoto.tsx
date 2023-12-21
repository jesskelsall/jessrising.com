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
    <main className="content-area photo">
      <div className="photo">
        <img alt={startCase(slug)} src={imagePath} />
      </div>
      <GalleryHeading />
      {markdown && (
        <div className="gallery-body">
          <Markdown>{markdown}</Markdown>
        </div>
      )}
    </main>
  );
};
