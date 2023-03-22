import { startCase } from "lodash/fp";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import path from "path";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { GalleryHeading } from "../GalleryHeading/GalleryHeading";

export const GalleryPhoto = () => {
  const { markdown, slug } = useGalleryPhoto();

  const imagePath = path.join("/photos", `${slug}.jpeg`);

  const options = {
    overrides: {
      h1: GalleryHeading,
    },
  };

  return (
    <main className="content-area photo">
      <Link className="photo" href={imagePath}>
        <img alt={startCase(slug)} src={imagePath} />
      </Link>
      <Markdown options={options}>{markdown}</Markdown>
    </main>
  );
};
