import { GetStaticProps, NextPage } from "next";
import { BlogPreview } from "../../components";
import { getAllBlogPosts } from "../../functions/fs";
import { IBlogPost } from "../../types";

interface IProps {
  blogPosts: IBlogPost[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const blogPosts = await getAllBlogPosts();
  const displayedBlogPosts = blogPosts.reverse();

  return {
    props: {
      blogPosts: displayedBlogPosts,
    },
  };
};

const BlogPage: NextPage<IProps> = ({ blogPosts }) => (
  <>
    <h1>Blog</h1>
    <ul>
      {blogPosts.map((blogPost) => (
        <BlogPreview key={blogPost.slug} blogPost={blogPost} />
      ))}
    </ul>
  </>
);

export default BlogPage;
