import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { Newsletter } from "../../components/Newsletter";
import { BlogPreview } from "../../components/Preview";
import { CONFIG } from "../../consts/config";
import { GalleryPhotoSlugsContext } from "../../context/galleryPhotoSlugs";
import blogPostsJSON from "../../data/blogPosts.json";
import { allGalleryPhotoSlugs } from "../../data/galleryPhotos";
import { dateFromSlug } from "../../functions/date";
import { sortBlogPostsByDate } from "../../functions/sort";
import { GalleryPhotoSlug } from "../../types/brand";
import { IMarkdownData, TMarkdownDataFile } from "../../types/markdownOld";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;

interface IProps {
  blogPosts: IMarkdownData[];
  galleryPhotoSlugs: GalleryPhotoSlug[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
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
      galleryPhotoSlugs: allGalleryPhotoSlugs,
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
