import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryPhoto as GalleryPhotoComponent } from "../../../components/GalleryPhoto/GalleryPhoto";
import { TContentArea } from "../../../components/Header/Header";
import { Newsletter } from "../../../components/Newsletter/Newsletter";
import { OpenGraphHeaders } from "../../../components/OpenGraphHeaders/OpenGraphHeaders";
import { CONFIG } from "../../../consts/config";
import { GalleryPhotoContext } from "../../../context/galleryPhoto";
import {
  allGalleryPhotoSlugs,
  allGalleryPhotosDict,
} from "../../../data/galleryPhotos";
import { getLocationHierarchy } from "../../../functions/location";
import { GalleryPhoto, GalleryPhotoSlug } from "../../../types/galleryPhoto";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  contentArea: TContentArea;
  galleryPhoto: GalleryPhoto;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => ({
  paths: allGalleryPhotoSlugs.map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  try {
    const slug = context.params?.slug;
    if (!slug) return { notFound: true };

    // Prepare page-specific props
    const galleryPhoto = allGalleryPhotosDict[slug as GalleryPhotoSlug];

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
  const { exif, meta, slug, title } = galleryPhoto;

  const location = getLocationHierarchy(meta.location).join(", ");

  return (
    <>
      <Head>
        <title>{title}</title>
        <OpenGraphHeaders
          date={exif.date}
          description={location}
          imageSlug={slug}
          urlPath={`gallery/p/${slug}`}
          title={title}
        />
      </Head>
      <GalleryPhotoContext.Provider value={galleryPhoto}>
        <GalleryPhotoComponent />
      </GalleryPhotoContext.Provider>
      {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
    </>
  );
};

export default GalleryPhotoPage;
