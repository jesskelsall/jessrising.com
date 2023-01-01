import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryPhoto } from "../../components";
import {
  asPageTitle,
  getMarkdownTitle,
  getSlugsFromMarkdownFiles,
} from "../../functions";
import { getAllGalleryPhotos, getContentFileNames } from "../../functions/fs";
import { IGalleryPhoto } from "../../types";

interface IProps {
  galleryPhoto: IGalleryPhoto;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
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
    // Get context data
    const allGalleryPhotos = await getAllGalleryPhotos();

    // Prepare page-specific props
    const galleryPhoto = allGalleryPhotos.find(
      (photo) => photo.slug === context.params?.slug
    );

    if (!galleryPhoto) return { notFound: true };

    return {
      props: {
        galleryPhoto,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const GalleryPhotoPage: NextPage<IProps> = ({ galleryPhoto }) => {
  const title = asPageTitle(getMarkdownTitle(galleryPhoto.markdown));

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GalleryPhoto galleryPhoto={galleryPhoto} />
    </>
  );
};

export default GalleryPhotoPage;
