import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogImage } from "../components/BlogImage/BlogImage";
import { BlogPreview } from "../components/BlogPreview/BlogPreview";
import { CONFIG } from "../consts/config";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { GalleryPhotosContext } from "../context/galleryPhotos";
import blogPostsJSON from "../data/blogPosts.json";
import galleryPhotosJSON from "../data/galleryPhotos.json";
import { getOtherMarkdownData } from "../functions/data";
import { dateFromSlug } from "../functions/date";
import { sortBlogPostsByDate } from "../functions/sort";
import { IMarkdownData, TMarkdownDataFile } from "../types/markdown";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;
const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

// If empty strings, the most recent is used instead
const FEATURED_BLOG_POST = "2022-12-31-favourite-photos-2022";
const FEATURED_PHOTO = "northern-lights-over-strathy-point-lighthouse";

interface IProps {
  allGalleryPhotos: IMarkdownData[];
  blogPost: IMarkdownData;
  photo: IMarkdownData;
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

  const allGalleryPhotos = getOtherMarkdownData(galleryPhotosData);
  const featuredPhoto =
    allGalleryPhotos.find((photo) => photo.slug === FEATURED_PHOTO) ||
    allGalleryPhotos[0];

  return {
    props: {
      allGalleryPhotos,
      blogPost: featuredBlogPost,
      photo: featuredPhoto,
    },
  };
};

const HomePage: NextPage<IProps> = ({ allGalleryPhotos, blogPost, photo }) => (
  <GalleryPhotosContext.Provider value={allGalleryPhotos}>
    <main className="content-area blog">
      {CONFIG.SHOW_FEATURED_BLOG_POST && (
        <>
          <h1>Featured Blog Post</h1>
          <ul className="blog-list">
            <BlogPreview blogPost={blogPost} />
          </ul>
        </>
      )}

      {CONFIG.SHOW_FEATURED_PHOTO && (
        <>
          <h1>Featured Photo</h1>
          <h2>{photo.summary.heading}</h2>
          <BlogImage
            alt={photo.summary.heading || ""}
            src={`${photo.slug}${PHOTO_SIZE_SUFFIX.LARGE}`}
            forceGallery
          />
        </>
      )}
    </main>
  </GalleryPhotosContext.Provider>
);

export default HomePage;
