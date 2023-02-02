import { GetStaticProps, NextPage } from "next";
import { GalleryGrid } from "../../components";
import { sortGalleryPhotosByDate } from "../../functions";
import { getAllGalleryPhotos } from "../../functions/fs";
import { IMarkdownData } from "../../types";

interface IProps {
  galleryPhotos: IMarkdownData[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const galleryPhotos = await getAllGalleryPhotos();
  const displayGalleryPhotos = galleryPhotos.sort(sortGalleryPhotosByDate);

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({ galleryPhotos }) => (
  <>
    <h1>Gallery</h1>
    <GalleryGrid galleryPhotos={galleryPhotos} />
  </>
);
export default GalleryPage;
