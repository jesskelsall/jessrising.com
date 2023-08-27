import { APP_NAME, URL } from "../../consts/app";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { getImageSrcFromSlug } from "../../functions/image";

interface IOpenGraphHeadersProps {
  date?: string;
  description?: string;
  imageSlug?: string;
  urlPath: string;
  title?: string;
}

/**
 * Renders The Open Graph Protocol headers for an article
 * https://ogp.me/
 */
export const OpenGraphHeaders = ({
  date,
  description,
  imageSlug,
  urlPath,
  title,
}: IOpenGraphHeadersProps) => (
  <>
    {title && <meta property="og:title" content={title} />}
    <meta property="og:type" content="article" />
    <meta property="og:url" content={`${URL}/${urlPath}`} />
    {imageSlug && (
      <meta
        property="og:image"
        content={getImageSrcFromSlug(imageSlug, PHOTO_SIZE_SUFFIX.SMALL)}
      />
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
      <meta property="article:published_time" content={date.slice(0, 10)} />
    )}
  </>
);
