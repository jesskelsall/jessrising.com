import { DateTime } from "luxon";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryGrid } from "../../../../components";
import galleryPhotosJSON from "../../../../data/galleryPhotos.json";
import {
  applyFilterQueries,
  asPageTitle,
  getOtherMarkdownData,
  parseEXIFDate,
  sortGalleryPhotosByDate,
} from "../../../../functions";
import { IMarkdownData, TMarkdownDataFile } from "../../../../types";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IParams extends ParsedUrlQuery {
  year: string;
  month: string;
}

interface IProps {
  galleryPhotos: IMarkdownData[];
  month: number;
  year: number;
}

export const getPhotoYearAndMonth = (
  photo: IMarkdownData
): string | undefined =>
  parseEXIFDate(photo.meta.photo?.date)?.toFormat("yyyy-LL");

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const galleryPhotos = getOtherMarkdownData(galleryPhotosData);

  const yearsAndMonths = galleryPhotos.reduce((uniqYearAndMonth, photo) => {
    const yearAndMonth = getPhotoYearAndMonth(photo);
    return yearAndMonth && !uniqYearAndMonth.includes(yearAndMonth)
      ? [...uniqYearAndMonth, yearAndMonth]
      : uniqYearAndMonth;
  }, [] as string[]);

  return {
    paths: yearsAndMonths.map((yearAndMonth) => {
      const [year, month] = yearAndMonth.split("-");
      return { params: { year, month } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  // Get context data
  const allGalleryPhotos = getOtherMarkdownData(galleryPhotosData);

  const yearString = context.params?.year;
  const monthString = context.params?.month;
  if (!yearString || !monthString) return { notFound: true };
  const yearAndMonth = `${yearString}-${monthString}`;

  // Prepare page-specific props
  const displayGalleryPhotos = applyFilterQueries<IMarkdownData>(
    allGalleryPhotos,
    [
      [yearAndMonth],
      (photo) => {
        const photoYear = getPhotoYearAndMonth(photo);
        return photoYear ? [photoYear] : [];
      },
    ]
  ).sort(sortGalleryPhotosByDate);

  const [year, month] = yearAndMonth
    .split("-")
    .map((part) => parseInt(part, 10));

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
      month,
      year,
    },
  };
};

const GalleryByMonthPage: NextPage<IProps> = ({
  galleryPhotos,
  month,
  year,
}) => {
  const monthTitle = DateTime.fromObject({ year, month, day: 1 }).toFormat(
    "LLLL yyyy"
  );
  const title = asPageTitle(`Gallery by Month: ${monthTitle}`);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>Gallery</h1>
      <h2>Month: {monthTitle}</h2>
      <GalleryGrid galleryPhotos={galleryPhotos} />
    </>
  );
};

export default GalleryByMonthPage;
