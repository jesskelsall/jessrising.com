import { GalleryPhoto, GalleryPhotoMetaCategory } from "../types/galleryPhoto";
import { getLocationHierarchy } from "./location";
import {
  extractMarkdownMetaLines,
  parseMarkdownFirstHeading,
  parseMarkdownListData,
} from "./markdown";

// TODO use in new gallery photo parsing work
export const parseMarkdownGalleryPhoto = (
  slug: string,
  markdown: string
): GalleryPhoto => {
  // Parse markdown lines
  const markdownLines = markdown.trim().split("\n");
  const { metaLines, otherLines } = extractMarkdownMetaLines(markdownLines);
  const metaData = parseMarkdownListData<GalleryPhotoMetaCategory>(metaLines);

  // Create object
  const galleryPhoto: GalleryPhoto = {
    slug,
    title: parseMarkdownFirstHeading(markdownLines) || slug,
    exif: {},
    meta: {},
  };
  if (otherLines.length) galleryPhoto.markdown = otherLines.join("\n");

  // Set optional values

  if (metaData.EXIF) {
    galleryPhoto.exif = JSON.parse(metaData.EXIF[0].replace(/`/g, ""));
  } else {
    if (metaData.Camera) {
      galleryPhoto.exif.camera = {
        name: `${metaData.Camera[0]}`,
      };
    }
    if (metaData.Date) galleryPhoto.exif.date = `${metaData.Date[0]}`;

    if (metaData.Dimensions) {
      const [width, height] = metaData.Dimensions[0]
        .split("x")
        .map((dimension) => parseInt(dimension, 10));
      if (!Number.isNaN(width) && !Number.isNaN(height)) {
        galleryPhoto.exif.dimensions = { height, width };
      }
    }
  }

  if (metaData.GPS) {
    const [lat, long] = metaData.GPS.map(parseFloat);
    galleryPhoto.meta.gps = { lat, long };
  }

  if (metaData.Location) {
    galleryPhoto.meta.location = getLocationHierarchy(metaData.Location[0]);
  }

  if (metaData.Tags) galleryPhoto.meta.tags = metaData.Tags;

  return galleryPhoto;
};
