import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { GalleryPhoto as GalleryPhotoComponent } from "../../../components/GalleryPhoto";
import { TContentArea } from "../../../components/Header";
import { Newsletter } from "../../../components/Newsletter";
import { OpenGraphHeaders } from "../../../components/OpenGraphHeaders";
import { CONFIG } from "../../../consts/config";
import { GalleryPhotoContext } from "../../../context/galleryPhoto";
import { GalleryPhotoSlugsContext } from "../../../context/galleryPhotoSlugs";
import {
  allGalleryPhotoSlugs,
  allGalleryPhotosDict,
} from "../../../data/galleryPhotos";
import { getLocationHierarchy } from "../../../functions/locationsDict";
import { GalleryPhotoSlug } from "../../../types/brand";
import { GalleryPhoto } from "../../../types/galleryPhoto";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  contentArea: TContentArea;
  galleryPhoto: GalleryPhoto;
  galleryPhotoSlugs: GalleryPhotoSlug[];
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
    const galleryPhoto = allGalleryPhotosDict[GalleryPhotoSlug.parse(slug)];
    if (!galleryPhoto) return { notFound: true };

    return {
      props: {
        contentArea: "photo",
        galleryPhoto,
        galleryPhotoSlugs: allGalleryPhotoSlugs,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

const GalleryPhotoPage: NextPage<IProps> = ({
  galleryPhoto,
  galleryPhotoSlugs,
}) => {
  const { exif, meta, slug, title } = galleryPhoto;

  const openGraphLocation = getLocationHierarchy(meta.location)
    .map((location) => location.title)
    .join(", ");

  return (
    <>
      <Head>
        <title>{title}</title>
        <OpenGraphHeaders
          date={exif.date}
          description={openGraphLocation}
          imageSlug={slug}
          urlPath={`gallery/p/${slug}`}
          title={title}
        />
      </Head>
      <GalleryPhotoSlugsContext.Provider value={galleryPhotoSlugs}>
        <GalleryPhotoContext.Provider value={galleryPhoto}>
          <GalleryPhotoComponent />
        </GalleryPhotoContext.Provider>
      </GalleryPhotoSlugsContext.Provider>
      {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
    </>
  );
};

export default GalleryPhotoPage;
