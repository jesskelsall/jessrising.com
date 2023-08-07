import { GalleryPhotoSlug } from "../types/brand";
import { GalleryPhoto } from "../types/galleryPhoto";
import { Location } from "../types/location";
import { IMarkdownData } from "../types/markdownOld";

export const MARKDOWN_DATA_EMPTY: IMarkdownData = {
  markdown: "",
  meta: { photo: {} },
  slug: "",
  summary: {},
};

export const GALLERY_PHOTO_EMPTY: GalleryPhoto = {
  title: "",
  slug: GalleryPhotoSlug.parse(""),
  meta: {
    gps: { lat: 0, long: 0 },
    location: Location.parse(""),
    tags: [],
    trip: null,
  },
  exif: {},
};
