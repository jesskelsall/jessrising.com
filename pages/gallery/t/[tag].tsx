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
  tag: string;
}

interface IProps {
  galleryPhotos: IMarkdownData[];
  tag: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const galleryPhotos = await getAllGalleryPhotos();
  const tags = uniq(
    galleryPhotos.map((photo) => (photo.meta.tags || []).map(kebabCase)).flat()
  );

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  // Get context data
  const allGalleryPhotos = await getAllGalleryPhotos();

  const tag = context.params?.tag;
  if (!tag) return { notFound: true };

  // Prepare page-specific props
  const displayGalleryPhotos = applyFilterQueries<IMarkdownData>(
    allGalleryPhotos,
    [[tag], (photo) => photo.meta.tags || []]
  ).sort(sortGalleryPhotosByDate);

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
      tag,
    },
  };
};

const GalleryByTagPage: NextPage<IProps> = ({ galleryPhotos, tag }) => (
  <>
    <h1>Gallery</h1>
    <h2>Tag: {titleCase(tag)}</h2>
    <GalleryGrid galleryPhotos={galleryPhotos} />
  </>
);

export default GalleryByTagPage;
