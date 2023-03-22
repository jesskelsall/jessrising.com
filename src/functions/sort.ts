import { IMarkdownData } from "../types/markdown";
import { dateFromString } from "./date";

// Sort gallery photos chronologically
// Any photos with no date are placed at the end of the array
export const sortGalleryPhotosByDate = (
  a: IMarkdownData,
  b: IMarkdownData
): number => {
  const aDate = dateFromString(a.meta.photo?.date);
  const bDate = dateFromString(b.meta.photo?.date);

  if (!aDate) return -1;
  if (!bDate) return 1;

  if (aDate > bDate) return -1;
  if (aDate < bDate) return 1;
  return 0;
};

// Sort gallery photos by date, reverse chronological
// Slugs start with ISO-8601 dates and can be numerically suffixed if multiple in one day
export const sortBlogPostsByDate = (
  a: IMarkdownData,
  b: IMarkdownData
): number => {
  const aSlug = a.slug;
  const bSlug = b.slug;

  if (aSlug < bSlug) return 1;
  if (aSlug > bSlug) return -1;
  return 0;
};
