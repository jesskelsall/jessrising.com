import {
  IGalleryPhoto,
  TGalleryPhotoMetaCategory,
} from "../types/galleryPhoto";
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
): IGalleryPhoto => {
  // Parse markdown lines
  const markdownLines = markdown.trim().split("\n");
  const { metaLines, otherLines } = extractMarkdownMetaLines(markdownLines);
  const metaData = parseMarkdownListData<TGalleryPhotoMetaCategory>(metaLines);

  // Create object
  const galleryPhoto: IGalleryPhoto = {
    slug,
    title: parseMarkdownFirstHeading(markdownLines) || slug,
    exif: {},
    meta: {},
  };
  if (otherLines.length) galleryPhoto.markdown = otherLines.join("\n");

  // Set optional values

  if (metaData.Camera) galleryPhoto.exif.camera = `${metaData.Camera[0]}`;
  if (metaData.Date) galleryPhoto.exif.date = `${metaData.Date[0]}`;
  if (metaData.Tags) galleryPhoto.meta.tags = metaData.Tags;

  if (metaData.Dimensions) {
    const [width, height] = metaData.Dimensions[0]
      .split("x")
      .map((dimension) => parseInt(dimension, 10));
    if (!Number.isNaN(width) && !Number.isNaN(height)) {
      galleryPhoto.exif.dimensions = { height, width };
    }
  }

  if (metaData.GPS) {
    const [lat, long] = metaData.GPS.map(parseFloat);
    galleryPhoto.meta.gps = { lat, long };
  }

  if (metaData.Location)
    galleryPhoto.meta.location = getLocationHierarchy(metaData.Location[0]);

  return galleryPhoto;
};
