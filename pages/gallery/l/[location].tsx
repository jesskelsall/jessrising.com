import { kebabCase, uniq } from "lodash/fp";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { GalleryGrid } from "../../../components";
import {
  applyFilterQueries,
  sortGalleryPhotosByDate,
  titleCase,
} from "../../../functions";
import { getAllGalleryPhotos } from "../../../functions/fs";
import { IMarkdownData } from "../../../types";

interface IParams extends ParsedUrlQuery {
  location: string;
}

interface IProps {
  galleryPhotos: IMarkdownData[];
  location: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const galleryPhotos = await getAllGalleryPhotos();
  const locations = uniq(
    galleryPhotos
      .map((photo) => (photo.meta.locations || []).flat().map(kebabCase))
      .flat()
  );

  return {
    paths: locations.map((location) => ({ params: { location } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  // Get context data
  const allGalleryPhotos = await getAllGalleryPhotos();

  const location = context.params?.location;
  if (!location) return { notFound: true };

  // Prepare page-specific props
  const displayGalleryPhotos = applyFilterQueries<IMarkdownData>(
    allGalleryPhotos,
    [[location], (photo) => photo.meta.locations?.flat() || []]
  )
    .sort(sortGalleryPhotosByDate)
    .reverse();

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
      location,
    },
  };
};

const GalleryByLocationPage: NextPage<IProps> = ({
  galleryPhotos,
  location,
}) => (
  <>
    <h1>Gallery</h1>
    <h2>Location: {titleCase(location)}</h2>
    <GalleryGrid galleryPhotos={galleryPhotos} />
  </>
);

export default GalleryByLocationPage;
