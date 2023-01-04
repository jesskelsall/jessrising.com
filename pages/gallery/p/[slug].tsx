import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryPhoto, OpenGraphHeaders } from "../../../components";
import { GalleryPhotoContext, GalleryPhotosContext } from "../../../context";
import { asPageTitle, getSlugsFromMarkdownFiles } from "../../../functions";
import {
  getAllGalleryPhotos,
  getContentFileNames,
} from "../../../functions/fs";
import { IEXIF, IMarkdownData } from "../../../types";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  allGalleryPhotos: IMarkdownData[];
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
  const { first, meta, slug } = galleryPhoto;

  const photo: IEXIF = meta.photo || {};
  const location = meta.locations ? meta.locations.join(", ") : undefined;
  const title = asPageTitle(first.heading);

  return (
    <>
      <Head>
        <title>{title}</title>
        <OpenGraphHeaders
          date={photo.date}
          description={location}
          imageSlug={slug}
          urlPath={`gallery/p/${slug}`}
          title={first.heading}
        />
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
