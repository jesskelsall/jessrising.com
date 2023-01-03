import { useContext } from "react";
import { BlogPostsContext } from "../../context";
import { TListRenderer } from "../../types";
import { BlogPreview } from "../BlogPreview";

export const BlogRelatedPosts: TListRenderer = ({ children }) => {
  const blogPosts = useContext(BlogPostsContext);

  const blogPostItems = children
    .map((child) => child.props.children[0] as string)
    .map((slug) => blogPosts.find((blogPost) => blogPost.slug === slug))
    .filter<IBlogPost>((child): child is IBlogPost => child !== undefined);

  return (
    <>
      <p>
        <em>Related blog posts:</em>
      </p>
      <ol>
        {blogPostItems.map((blogPost) => (
          <BlogPreview key={blogPost.slug} blogPost={blogPost} />
        ))}
      </ol>
    </>
  );
};
