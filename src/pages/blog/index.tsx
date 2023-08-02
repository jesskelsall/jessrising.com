import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogPreview } from "../../components/BlogPreview/BlogPreview";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { CONFIG } from "../../consts/config";
import { GalleryPhotoSlugsContext } from "../../context/galleryPhotoSlugs";
import blogPostsJSON from "../../data/blogPosts.json";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import { dateFromSlug } from "../../functions/date";
import { sortBlogPostsByDate } from "../../functions/sort";
import { GalleryPhotos } from "../../types/galleryPhoto";
import { IMarkdownData, TMarkdownDataFile } from "../../types/markdownOld";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;
const galleryPhotosData = galleryPhotosJSON as GalleryPhotos;

interface IProps {
  blogPosts: IMarkdownData[];
  galleryPhotoSlugs: string[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  // Get context data
  const galleryPhotoSlugs = Object.keys(galleryPhotosData);

  const displayedBlogPosts = Object.values(blogPostsData)
    .filter((blogPost) => {
      // Hide future posts
      const date = dateFromSlug(blogPost.slug);
      return !date || date <= DateTime.now();
    })
    .sort(sortBlogPostsByDate);

  return {
    props: {
      blogPosts: displayedBlogPosts,
      galleryPhotoSlugs,
    },
  };
};

const BlogPage: NextPage<IProps> = ({ blogPosts, galleryPhotoSlugs }) => (
  <GalleryPhotoSlugsContext.Provider value={galleryPhotoSlugs}>
    <main className="content-area blog">
      <h1>Blog</h1>
      <ul className="blog-list">
        {blogPosts.map((blogPost) => (
          <BlogPreview key={blogPost.slug} blogPost={blogPost} />
        ))}
      </ul>
    </main>
    {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
  </GalleryPhotoSlugsContext.Provider>
);

export default BlogPage;
