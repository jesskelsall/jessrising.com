import { GetStaticProps, NextPage } from "next";
import { GalleryGrid } from "../../components";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import { getOtherMarkdownData, sortGalleryPhotosByDate } from "../../functions";
import { IMarkdownData, TMarkdownDataFile } from "../../types";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IProps {
  galleryPhotos: IMarkdownData[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const galleryPhotos = getOtherMarkdownData(galleryPhotosData);
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
