import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryGrid } from "../../../../components";
import {
  applyFilterQueries,
  asPageTitle,
  parseEXIFDate,
  sortGalleryPhotosByDate,
} from "../../../../functions";
import { getAllGalleryPhotos } from "../../../../functions/fs";
import { IMarkdownData } from "../../../../types";

interface IParams extends ParsedUrlQuery {
  year: string;
}

interface IProps {
  galleryPhotos: IMarkdownData[];
  year: number;
}

export const getPhotoYear = (photo: IMarkdownData): string | undefined =>
  parseEXIFDate(photo.meta.photo?.date)?.toFormat("yyyy");

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const galleryPhotos = await getAllGalleryPhotos();

  const years = galleryPhotos.reduce((uniqYears, photo) => {
    const year = getPhotoYear(photo);
    return year && !uniqYears.includes(year) ? [...uniqYears, year] : uniqYears;
  }, [] as string[]);

  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  // Get context data
  const allGalleryPhotos = await getAllGalleryPhotos();

  const year = context.params?.year;
  if (!year) return { notFound: true };

  // Prepare page-specific props
  const displayGalleryPhotos = applyFilterQueries<IMarkdownData>(
    allGalleryPhotos,
    [
      [year],
      (photo) => {
        const photoYear = getPhotoYear(photo);
        return photoYear ? [photoYear] : [];
      },
    ]
  ).sort(sortGalleryPhotosByDate);

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
      year: parseInt(year, 10),
    },
  };
};

const GalleryByYearPage: NextPage<IProps> = ({ galleryPhotos, year }) => {
  const title = asPageTitle(`Gallery by Year: ${year}`);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>Gallery</h1>
      <h2>Year: {year}</h2>
      <GalleryGrid galleryPhotos={galleryPhotos} />
    </>
  );
};
export default GalleryByYearPage;
