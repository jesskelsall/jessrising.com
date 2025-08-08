import { orderBy } from "lodash/fp";
import { DateTime } from "luxon";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { BlogImage } from "../components/BlogImage";
import { BlogPreview } from "../components/Preview";
import { CONFIG } from "../consts/config";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { GalleryPhotoSlugsContext } from "../context/galleryPhotoSlugs";
import blogPostsJSON from "../data/blogPosts.json";
import {
  allGalleryPhotoSlugs,
  allGalleryPhotosDict,
  allGalleryPhotosList,
} from "../data/galleryPhotos";
import { allTripsList } from "../data/trips";
import { dateFromSlug } from "../functions/date";
import { sortBlogPostsByDate } from "../functions/sort";
import { GalleryPhotoSlug } from "../types/brand";
import { GalleryPhoto } from "../types/galleryPhoto";
import { IMarkdownData, TMarkdownDataFile } from "../types/markdownOld";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;

// If empty strings, the most recent is used instead
export const FEATURED_BLOG_POST = "2025-02-12-2024-in-statistics";
export const FEATURED_PHOTO = "";

interface IProps {
  blogPost: IMarkdownData;
  galleryPhotoSlugs: GalleryPhotoSlug[];
  onThisDayPhoto: GalleryPhoto | null;
  recentPhoto: GalleryPhoto;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  // Featured blog post
  const allBlogPosts = Object.values(blogPostsData)
    .filter((blogPost) => {
      // Hide future posts
      const date = dateFromSlug(blogPost.slug);
      return !date || date <= DateTime.now();
    })
    .sort(sortBlogPostsByDate);
  const featuredBlogPost =
    allBlogPosts.find((post) => post.slug === FEATURED_BLOG_POST) ||
    allBlogPosts[0];

  // Recent photo
  const recentPhoto =
    allGalleryPhotosDict[
      GalleryPhotoSlug.parse(
        FEATURED_PHOTO ||
          orderBy(["dates.from"], ["desc"], allTripsList)[0].thumbnail
      )
    ];

  // On this day photo
  // Displays the closest photo to the current time of day
  let onThisDayPhoto: GalleryPhoto | null = null;
  const thisDay = DateTime.now().toFormat("MM-dd");
  const onThisDayPhotos = allGalleryPhotosList.filter(
    (photo) => photo.exif.date?.slice(5, 10) === thisDay
  );
  const getRelativeSeconds = (date: DateTime): number => {
    const { hour, minute, second } = date.toObject();
    const relativeDate = DateTime.fromObject({ hour, minute, second });
    return relativeDate.diffNow().as("seconds");
  };
  if (onThisDayPhotos.length) {
    [onThisDayPhoto] = onThisDayPhotos.sort((photoA, photoB) => {
      const deltaA = Math.abs(
        getRelativeSeconds(DateTime.fromISO(photoA.exif.date as string))
      );
      const deltaB = Math.abs(
        getRelativeSeconds(DateTime.fromISO(photoB.exif.date as string))
      );
      if (deltaA > deltaB) return 1;
      if (deltaA < deltaB) return -1;
      return 0;
    });
  }

  return {
    props: {
      blogPost: featuredBlogPost,
      galleryPhotoSlugs: allGalleryPhotoSlugs,
      onThisDayPhoto,
      recentPhoto,
    },
  };
};

const HomePage: NextPage<IProps> = ({
  blogPost,
  galleryPhotoSlugs,
  onThisDayPhoto,
  recentPhoto,
}) => (
  <GalleryPhotoSlugsContext.Provider value={galleryPhotoSlugs}>
    <main className="mx-auto max-w-screen-sm px-2 md:max-w-screen-md">
      <h1>Featured Photos</h1>
      <h2>
        Recent:{" "}
        <Link href={`/gallery/p/${recentPhoto.slug}`}>{recentPhoto.title}</Link>
      </h2>
      <BlogImage
        alt={recentPhoto.title}
        src={`${recentPhoto.slug}${PHOTO_SIZE_SUFFIX.LARGE}`}
        forceGallery
      />
      {onThisDayPhoto && (
        <>
          <h2>
            On this day {onThisDayPhoto.exif.date?.slice(0, 4)}:{" "}
            <Link href={`/gallery/p/${onThisDayPhoto.slug}`}>
              {onThisDayPhoto.title}
            </Link>
          </h2>
          <BlogImage
            alt={onThisDayPhoto.title}
            src={`${onThisDayPhoto.slug}${PHOTO_SIZE_SUFFIX.LARGE}`}
            forceGallery
          />
        </>
      )}

      {CONFIG.SHOW_FEATURED_BLOG_POST && (
        <>
          <h1>Featured Blog Post</h1>
          <ul className="flex flex-col gap-8 sm:gap-12">
            <BlogPreview blogPost={blogPost} />
          </ul>
        </>
      )}
    </main>
  </GalleryPhotoSlugsContext.Provider>
);

export default HomePage;
