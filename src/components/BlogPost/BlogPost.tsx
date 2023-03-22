import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { useBlogPost } from "../../context/blogPost";
import { BlogHeading } from "../BlogHeading/BlogHeading";
import { BlogImage } from "../BlogImage/BlogImage";
import { BlogYouTubeVideo } from "../BlogYouTubeVideo/BlogYouTubeVideo";
import { MarkdownOrderedList } from "../MarkdownOrderedList/MarkdownOrderedList";

export const BlogPost = () => {
  const blogPost = useBlogPost();

  const options = {
    overrides: {
      a: Link,
      h1: BlogHeading,
      img: BlogImage,
      ol: MarkdownOrderedList,
      youtube: BlogYouTubeVideo,
    },
  };

  return (
    <main className="content-area blog">
      <Markdown options={options}>{blogPost.markdown}</Markdown>
    </main>
  );
};