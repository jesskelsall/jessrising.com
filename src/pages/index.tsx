import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
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
} from "../data/galleryPhotos";
import { dateFromSlug } from "../functions/date";
import { sortBlogPostsByDate } from "../functions/sort";
import { GalleryPhotoSlug } from "../types/brand";
import { GalleryPhoto } from "../types/galleryPhoto";
import { IMarkdownData, TMarkdownDataFile } from "../types/markdownOld";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;

// If empty strings, the most recent is used instead
export const FEATURED_BLOG_POST = "2023-12-21-2023-in-a-nutshell";
export const FEATURED_PHOTO = GalleryPhotoSlug.parse(
  "wintry-telephone-box-231202"
);

interface IProps {
  blogPost: IMarkdownData;
  galleryPhotoSlugs: GalleryPhotoSlug[];
  photo: GalleryPhoto | undefined;
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
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

  const featuredPhoto = allGalleryPhotosDict[FEATURED_PHOTO];

  return {
    props: {
      blogPost: featuredBlogPost,
      galleryPhotoSlugs: allGalleryPhotoSlugs,
      photo: featuredPhoto,
    },
  };
};

const HomePage: NextPage<IProps> = ({ blogPost, galleryPhotoSlugs, photo }) => (
  <GalleryPhotoSlugsContext.Provider value={galleryPhotoSlugs}>
    <main className="content-area blog">
      {CONFIG.SHOW_FEATURED_BLOG_POST && (
        <>
          <h1>Featured Blog Post</h1>
          <ul className="blog-list">
            <BlogPreview blogPost={blogPost} />
          </ul>
        </>
      )}

      {CONFIG.SHOW_FEATURED_PHOTO && photo && (
        <>
          <h1>Featured Photo</h1>
          <h2>
            <Link href={`/gallery/p/${FEATURED_PHOTO}`}>{photo.title}</Link>
          </h2>
          <BlogImage
            alt={photo.title}
            src={`${photo.slug}${PHOTO_SIZE_SUFFIX.LARGE}`}
            forceGallery
          />
        </>
      )}
    </main>
  </GalleryPhotoSlugsContext.Provider>
);

export default HomePage;
