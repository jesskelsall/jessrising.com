import { GalleryPhotoData } from "../types/galleryPhoto";
import { Location } from "../types/location";
import { IMarkdownData } from "../types/markdownOld";

export const MARKDOWN_DATA_EMPTY: IMarkdownData = {
  markdown: "",
  meta: { photo: {} },
  slug: "",
  summary: {},
};

export const GALLERY_PHOTO_DATA_EMPTY: GalleryPhotoData = {
  exif: {},
  meta: {
    location: "" as Location,
    tags: [],
  },
  title: "",
};
