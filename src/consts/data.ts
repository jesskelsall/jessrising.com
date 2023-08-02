import { GalleryPhoto } from "../types/galleryPhoto";
import { IMarkdownData } from "../types/markdown";

export const MARKDOWN_DATA_EMPTY: IMarkdownData = {
  markdown: "",
  meta: { photo: {} },
  slug: "",
  summary: {},
};

export const GALLERY_PHOTO_EMPTY: GalleryPhoto = {
  exif: {},
  meta: {},
  slug: "",
  title: "",
};
