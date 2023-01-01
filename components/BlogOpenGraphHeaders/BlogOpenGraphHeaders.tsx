import { APP_NAME, URL } from "../../consts";
import {
  dateFromSlug,
  getMarkdownFirstImageSlug,
  getMarkdownFirstParagraph,
  getMarkdownTitle,
} from "../../functions";
import { IBlogPost } from "../../types";

interface IBlogOpenGraphHeaders {
  blogPost: IBlogPost;
}

/**
 * Renders The Open Graph Protocol headers for blog posts
 * https://ogp.me/
 */
export const BlogOpenGraphHeaders = ({ blogPost }: IBlogOpenGraphHeaders) => {
  const { markdown, slug } = blogPost;
  const date = dateFromSlug(slug);
  const description = getMarkdownFirstParagraph(markdown);
  const title = getMarkdownTitle(markdown);
  const photoSlug = getMarkdownFirstImageSlug(markdown);

  return (
    <>
      {title && (
        <meta property="og:title" content={getMarkdownTitle(markdown)} />
      )}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${URL}/blog/${slug}`} />
      {photoSlug && (
        <meta property="og:image" content={`${URL}/photos/${photoSlug}.jpeg`} />
      )}

      {description && (
        <>
          <meta name="description" content={description} key="desc" />
          <meta property="og:description" content={description} />
        </>
      )}
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="article:author" content={`${URL}/me`} />
      {date && (
        <meta property="article:published_time" content={date.toISODate()} />
      )}
    </>
  );
};
