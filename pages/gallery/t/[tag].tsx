import { kebabCase, uniq } from "lodash/fp";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryGrid } from "../../../components";
import { TContentArea } from "../../../components/Header/Header";
import galleryPhotosJSON from "../../../data/galleryPhotos.json";
import {
  applyFilterQueries,
  asPageTitle,
  getOtherMarkdownData,
  sortGalleryPhotosByDate,
  titleCase,
} from "../../../functions";
import { IMarkdownData, TMarkdownDataFile } from "../../../types";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IParams extends ParsedUrlQuery {
  tag: string;
}

interface IProps {
  contentArea: TContentArea;
  galleryPhotos: IMarkdownData[];
  tag: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const galleryPhotos = getOtherMarkdownData(galleryPhotosData);
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
  const allGalleryPhotos = getOtherMarkdownData(galleryPhotosData);

  const tag = context.params?.tag;
  if (!tag) return { notFound: true };

  // Prepare page-specific props
  const displayGalleryPhotos = applyFilterQueries<IMarkdownData>(
    allGalleryPhotos,
    [[tag], (photo) => photo.meta.tags || []]
  ).sort(sortGalleryPhotosByDate);

  return {
    props: {
      contentArea: "gallery",
      galleryPhotos: displayGalleryPhotos,
      tag,
    },
  };
};

const GalleryByTagPage: NextPage<IProps> = ({ galleryPhotos, tag }) => {
  const tagTitle = titleCase(tag);
  const title = asPageTitle(`Gallery by Tag: ${tagTitle}`);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="content-area gallery">
        <h1>Gallery</h1>
        <h2>Tag: {tagTitle}</h2>
        <GalleryGrid galleryPhotos={galleryPhotos} />
      </main>
    </>
  );
};

export default GalleryByTagPage;
