import { S3_BUCKET } from "../consts/app";

// Gets the S3 bucket path for the given image slug
export const getImageSrcFromSlug = (slug: string): string =>
  `${S3_BUCKET}/${slug}.jpeg`;
