import { GetStaticProps, NextPage } from "next";
import { GalleryGrid } from "../../components";
import { TContentArea } from "../../components/Header/Header";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import { getOtherMarkdownData, sortGalleryPhotosByDate } from "../../functions";
import { IMarkdownData, TMarkdownDataFile } from "../../types";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IProps {
  contentArea: TContentArea;
  galleryPhotos: IMarkdownData[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const galleryPhotos = getOtherMarkdownData(galleryPhotosData);
  const displayGalleryPhotos = galleryPhotos.sort(sortGalleryPhotosByDate);

  return {
    props: {
      contentArea: "gallery",
      galleryPhotos: displayGalleryPhotos,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({ galleryPhotos }) => (
  <main className="content-area gallery">
    <h1>Gallery</h1>
    <GalleryGrid galleryPhotos={galleryPhotos} />
  </main>
);
export default GalleryPage;
