import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { useBlogPost } from "../../context";
import { BlogHeading } from "../BlogHeading";
import { BlogImage } from "../BlogImage";
import { MarkdownOrderedList } from "../MarkdownOrderedList";

export const BlogPost = () => {
  const blogPost = useBlogPost();

  const options = {
    overrides: {
      a: Link,
      h1: BlogHeading,
      img: BlogImage,
      ol: MarkdownOrderedList,
    },
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Markdown options={options}>{blogPost.markdown}</Markdown>
    </div>
  );
};
