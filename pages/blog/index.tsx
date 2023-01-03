import { DateTime } from "luxon";
import { GetStaticProps, NextPage } from "next";
import { BlogPreview } from "../../components";
import { dateFromSlug } from "../../functions";
import { getAllBlogPosts } from "../../functions/fs";
import { IBlogPost } from "../../types";

interface IProps {
  blogPosts: IBlogPost[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const blogPosts = await getAllBlogPosts();
  const displayedBlogPosts = blogPosts.reverse().filter((blogPost) => {
    // Hide future posts
    const date = dateFromSlug(blogPost.slug);
    return !date || date <= DateTime.now();
  });

  return {
    props: {
      blogPosts: displayedBlogPosts,
    },
  };
};

const BlogPage: NextPage<IProps> = ({ blogPosts }) => (
  <div style={{ maxWidth: 800, margin: "0 auto" }}>
    <h1>Blog</h1>
    <ul>
      {blogPosts.map((blogPost) => (
        <BlogPreview key={blogPost.slug} blogPost={blogPost} />
      ))}
    </ul>
  </div>
);

export default BlogPage;
