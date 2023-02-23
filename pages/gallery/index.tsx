import _ from "lodash/fp";
import { GetServerSideProps, NextPage } from "next";
import { GalleryGrid, GalleryPagination } from "../../components";
import { TContentArea } from "../../components/Header/Header";
import { GALLERY_PHOTOS_PER_PAGE } from "../../consts";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import { getOtherMarkdownData, sortGalleryPhotosByDate } from "../../functions";
import { queryParamToIntegers } from "../../functions/params";
import { IGalleryQuery, IMarkdownData, TMarkdownDataFile } from "../../types";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IProps {
  contentArea: TContentArea;
  galleryPhotos: IMarkdownData[];
  page: number;
  pages: number;
  query: IGalleryQuery;
}

export const getServerSideProps: GetServerSideProps<
  IProps,
  IGalleryQuery
> = async (context) => {
  // Query parameters
  const query = context.query as IGalleryQuery;
  const page = queryParamToIntegers(query.page)[0] || 1;

  const galleryPhotos = getOtherMarkdownData(galleryPhotosData).sort(
    sortGalleryPhotosByDate
  );

  // Apply pagination
  const galleryPages = _.chunk(GALLERY_PHOTOS_PER_PAGE, galleryPhotos);
  const galleryPage = galleryPages[page - 1] || _.last(galleryPages);
  const pages = galleryPages.length;

  return {
    props: {
      contentArea: "gallery",
      galleryPhotos: galleryPage,
      page,
      pages,
      query,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({
  galleryPhotos,
  page,
  pages,
  query,
}) => (
  <main className="content-area gallery">
    <h1>Gallery</h1>
    <GalleryGrid galleryPhotos={galleryPhotos} />
    <GalleryPagination page={page} pages={pages} query={query} />
  </main>
);
export default GalleryPage;
