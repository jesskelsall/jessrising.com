import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogImage } from "../components/BlogImage/BlogImage";
import { BlogPreview } from "../components/BlogPreview/BlogPreview";
import blogPostsJSON from "../data/blogPosts.json";
import galleryPhotosJSON from "../data/galleryPhotos.json";
import { getOtherMarkdownData } from "../functions/data";
import { dateFromSlug } from "../functions/date";
import {
  sortBlogPostsByDate,
  sortGalleryPhotosByDate,
} from "../functions/sort";
import { IMarkdownData, TMarkdownDataFile } from "../types/markdown";
import { CONFIG } from "../consts/config";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;
const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

// If empty strings, the most recent is used instead
const FEATURED_BLOG_POST = "";
const FEATURED_PHOTO = "dore-head-view";

interface IProps {
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

  const allPhotos = getOtherMarkdownData(galleryPhotosData).sort(
    sortGalleryPhotosByDate
  );
  const featuredPhoto =
    allPhotos.find((photo) => photo.slug === FEATURED_PHOTO) || allPhotos[0];

  return {
    props: {
      blogPost: featuredBlogPost,
      photo: featuredPhoto,
    },
  };
};

const HomePage: NextPage<IProps> = ({ blogPost, photo }) => (
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
          src={`${photo.slug}.jpeg`}
          forceGallery
        />
      </>
    )}
  </main>
);

export default HomePage;
