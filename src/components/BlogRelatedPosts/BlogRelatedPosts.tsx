import { useBlogPosts } from "../../context/blogPosts";
import { IMarkdownData, TListRenderer } from "../../types/markdown";
import { BlogPreview } from "../BlogPreview/BlogPreview";

export const BlogRelatedPosts: TListRenderer = ({ children }) => {
  const allBlogPosts = useBlogPosts();

  const blogPostItems = children
    .map((child) => child.props.children[0] as string)
    .map((slug) => allBlogPosts.find((blogPost) => blogPost.slug === slug))
    .filter<IMarkdownData>(
      (child): child is IMarkdownData => child !== undefined
    );

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
