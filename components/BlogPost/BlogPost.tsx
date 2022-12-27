import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { IBlogPost } from "../../types";
import { BlogHeading } from "../BlogHeading";
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
      ol: BlogOrderedList,
    },
  };

  return <Markdown options={options}>{markdown}</Markdown>;
};
