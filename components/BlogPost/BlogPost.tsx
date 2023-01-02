import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { IBlogPost } from "../../types";
import { BlogHeading } from "../BlogHeading";
import { BlogImage } from "../BlogImage";
import { BlogOrderedList } from "../BlogOrderedList";

interface IBlogPostProps {
  blogPost: IBlogPost;
}

export const BlogPost = ({ blogPost }: IBlogPostProps) => {
  const { markdown, slug } = blogPost;

  const options = {
    overrides: {
      a: Link,
      h1: {
        component: BlogHeading,
        props: { slug },
      },
      img: BlogImage,
      ol: BlogOrderedList,
    },
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Markdown options={options}>{markdown}</Markdown>
    </div>
  );
};
