import { APP_NAME, URL } from "../../consts";
import { useBlogPost } from "../../context";

/**
 * Renders The Open Graph Protocol headers for blog posts
 * https://ogp.me/
 */
export const BlogOpenGraphHeaders = () => {
  const { date, first, slug } = useBlogPost();

  return (
    <>
      {first.heading && <meta property="og:title" content={first.heading} />}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${URL}/blog/${slug}`} />
      {first.imageSlug && (
        <meta
          property="og:image"
          content={`${URL}/photos/${first.imageSlug}.jpeg`}
        />
      )}

      {first.paragraph && (
        <>
          <meta name="description" content={first.paragraph} key="desc" />
          <meta property="og:description" content={first.paragraph} />
        </>
      )}
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="article:author" content={`${URL}/me`} />
      {date && <meta property="article:published_time" content={date} />}
    </>
  );
};
