import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogPreview } from "../../components/BlogPreview/BlogPreview";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { CONFIG } from "../../consts/config";
import { GalleryPhotosContext } from "../../context/galleryPhotos";
import blogPostsJSON from "../../data/blogPosts.json";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import { getOtherMarkdownData } from "../../functions/data";
import { dateFromSlug } from "../../functions/date";
import { sortBlogPostsByDate } from "../../functions/sort";
import { IMarkdownData, TMarkdownDataFile } from "../../types/markdown";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;
const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IProps {
  allGalleryPhotos: IMarkdownData[];
  blogPosts: IMarkdownData[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  // Get context data
  const allGalleryPhotos = getOtherMarkdownData(galleryPhotosData);

  const displayedBlogPosts = Object.values(blogPostsData)
    .filter((blogPost) => {
      // Hide future posts
      const date = dateFromSlug(blogPost.slug);
      return !date || date <= DateTime.now();
    })
    .sort(sortBlogPostsByDate);

  return {
    props: {
      allGalleryPhotos,
      blogPosts: displayedBlogPosts,
    },
  };
};

const BlogPage: NextPage<IProps> = ({ allGalleryPhotos, blogPosts }) => (
  <GalleryPhotosContext.Provider value={allGalleryPhotos}>
    <main className="content-area blog">
      <h1>Blog</h1>
      <ul className="blog-list">
        {blogPosts.map((blogPost) => (
          <BlogPreview key={blogPost.slug} blogPost={blogPost} />
        ))}
      </ul>
    </main>
    {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
  </GalleryPhotosContext.Provider>
);

export default BlogPage;
