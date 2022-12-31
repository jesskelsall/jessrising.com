import { GetStaticProps, NextPage } from "next";
import { getAllGalleryPhotos } from "../../functions/fs";
import { IGalleryPhoto } from "../../types";

interface IProps {
  galleryPhotos: IGalleryPhoto[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const galleryPhotos = await getAllGalleryPhotos();

  return {
    props: {
      galleryPhotos,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({ galleryPhotos }) => (
  <>
    <h1>Gallery</h1>
    <pre>{JSON.stringify(galleryPhotos)}</pre>
  </>
);

export default GalleryPage;
