import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { useBlogPost } from "../context/blogPost";
import { BlogHeading } from "./BlogHeading";
import { BlogImage } from "./BlogImage";
import { BlogListItem, BlogUnorderedList } from "./BlogList";
import { BlogEmphasis, BlogStrong } from "./BlogTypography";
import { BlogYouTubeVideo } from "./BlogYouTubeVideo";

export const BlogPost = () => {
  const blogPost = useBlogPost();

  const options = {
    overrides: {
      a: Link,
      em: BlogEmphasis,
      h1: BlogHeading,
      img: BlogImage,
      li: BlogListItem,
      strong: BlogStrong,
      ul: BlogUnorderedList,
      youtube: BlogYouTubeVideo,
    },
  };

  return (
    <main className="mx-auto max-w-screen-sm px-2 md:max-w-screen-md">
      <Markdown options={options}>{blogPost.markdown}</Markdown>
    </main>
  );
};
