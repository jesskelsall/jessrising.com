import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { IBlogPost } from "../../types";
import { BlogHeading } from "../BlogHeading";

export const BlogPost = ({ markdown, slug }: IBlogPost) => {
  const options = {
    overrides: {
      a: Link,
      h1: {
        component: BlogHeading,
        props: { slug },
      },
    },
  };

  return <Markdown options={options}>{markdown}</Markdown>;
};
