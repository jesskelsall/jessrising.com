import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryPhoto } from "../../../components/GalleryPhoto/GalleryPhoto";
import { TContentArea } from "../../../components/Header/Header";
import { OpenGraphHeaders } from "../../../components/OpenGraphHeaders/OpenGraphHeaders";
import { GalleryPhotoContext } from "../../../context/galleryPhoto";
import galleryPhotosJSON from "../../../data/galleryPhotos.json";
import { getMarkdownDataBySlug } from "../../../functions/data";
import { getSlugsFromMarkdownFiles } from "../../../functions/file";
import { getContentFileNames } from "../../../functions/fs";
import { asPageTitle } from "../../../functions/title";
import { IEXIF } from "../../../types/gallery";
import { IMarkdownData, TMarkdownDataFile } from "../../../types/markdown";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  contentArea: TContentArea;
  galleryPhoto: IMarkdownData;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const photoFiles = await getContentFileNames("photos");
  const photoSlugs = getSlugsFromMarkdownFiles(photoFiles);

  return {
    paths: photoSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  try {
    const slug = context.params?.slug;
    if (!slug) return { notFound: true };

    // Prepare page-specific props
    const galleryPhoto = getMarkdownDataBySlug(galleryPhotosData, slug);

    if (!galleryPhoto) return { notFound: true };

    return {
      props: {
        contentArea: "photo",
        galleryPhoto,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const GalleryPhotoPage: NextPage<IProps> = ({ galleryPhoto }) => {
  const { meta, slug, summary } = galleryPhoto;

  const photo: IEXIF = meta.photo || {};
  const location = meta.locations
    ? meta.locations
        .map((locationGroup) => locationGroup.join(" / "))
        .join(", ")
    : undefined;
  const title = asPageTitle(summary.heading);

  return (
    <>
      <Head>
        <title>{title}</title>
        <OpenGraphHeaders
          date={photo.date}
          description={location}
          imageSlug={slug}
          urlPath={`gallery/p/${slug}`}
          title={summary.heading}
        />
      </Head>
      <GalleryPhotoContext.Provider value={galleryPhoto}>
        <GalleryPhoto />
      </GalleryPhotoContext.Provider>
    </>
  );
};

export default GalleryPhotoPage;
