import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogPreview } from "../../components/BlogPreview/BlogPreview";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { CONFIG } from "../../consts/config";
import blogPostsJSON from "../../data/blogPosts.json";
import { dateFromSlug } from "../../functions/date";
import { sortBlogPostsByDate } from "../../functions/sort";
import { IMarkdownData, TMarkdownDataFile } from "../../types/markdown";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;

interface IProps {
  blogPosts: IMarkdownData[];
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
    },
  };
};

const BlogPage: NextPage<IProps> = ({ blogPosts }) => (
  <>
    <main className="content-area blog">
      <h1>Blog</h1>
      <ul className="blog-list">
        {blogPosts.map((blogPost) => (
          <BlogPreview key={blogPost.slug} blogPost={blogPost} />
        ))}
      </ul>
    </main>
    {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
  </>
);

export default BlogPage;
