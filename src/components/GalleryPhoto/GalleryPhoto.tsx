import { startCase } from "lodash/fp";
import Markdown from "markdown-to-jsx";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { getImageSrcFromSlug } from "../../functions/image";
import { GalleryHeading } from "../GalleryHeading/GalleryHeading";

export const GalleryPhoto = () => {
  const { markdown, slug } = useGalleryPhoto();

  const imagePath = getImageSrcFromSlug(slug);

  const options = {
    overrides: {
      h1: GalleryHeading,
    },
  };

  return (
    <main className="content-area photo">
      <div className="photo">
        <img alt={startCase(slug)} src={imagePath} />
      </div>
      <Markdown options={options}>{markdown}</Markdown>
    </main>
  );
};
