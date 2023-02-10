import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogPreview } from "../../components";
import { dateFromSlug, sortBlogPostsByDate } from "../../functions";
import { IMarkdownData, TMarkdownDataFile } from "../../types";
import blogPostsJSON from "../../data/blogPosts.json";

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
  <main className="content-area blog">
    <h1>Blog</h1>
    <ul className="blog-list">
      {blogPosts.map((blogPost) => (
        <BlogPreview key={blogPost.slug} blogPost={blogPost} />
      ))}
    </ul>
  </main>
);

export default BlogPage;
