import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryPhoto } from "../../components";
import { GalleryPhotoContext, GalleryPhotosContext } from "../../context";
import { asPageTitle, getSlugsFromMarkdownFiles } from "../../functions";
import { getAllGalleryPhotos, getContentFileNames } from "../../functions/fs";
import { IMarkdownData } from "../../types";

interface IProps {
  allGalleryPhotos: IMarkdownData[];
  galleryPhoto: IMarkdownData;
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
        allGalleryPhotos,
        galleryPhoto,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const GalleryPhotoPage: NextPage<IProps> = ({
  allGalleryPhotos,
  galleryPhoto,
}) => {
  const title = asPageTitle(galleryPhoto.first.heading);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GalleryPhotosContext.Provider value={allGalleryPhotos}>
        <GalleryPhotoContext.Provider value={galleryPhoto}>
          <GalleryPhoto />
        </GalleryPhotoContext.Provider>
      </GalleryPhotosContext.Provider>
    </>
  );
};

export default GalleryPhotoPage;
