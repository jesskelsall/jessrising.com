import { GalleryPhoto } from "../types/galleryPhoto";
import { IMarkdownData } from "../types/markdownOld";
import { dateFromString } from "./date";

// Sort gallery photos chronologically
// Any photos with no date are placed at the end of the array
export const sortGalleryPhotosByDate =
  (oldestFirst: boolean) =>
  (a: GalleryPhoto, b: GalleryPhoto): number => {
    const aDate = dateFromString(a.exif.date);
    const bDate = dateFromString(b.exif.date);

    if (!aDate) return oldestFirst ? 1 : -1;
    if (!bDate) return oldestFirst ? -1 : 1;

    if (aDate > bDate) return oldestFirst ? 1 : -1;
    if (aDate < bDate) return oldestFirst ? -1 : 1;
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
