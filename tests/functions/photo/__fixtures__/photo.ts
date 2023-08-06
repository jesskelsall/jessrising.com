import {
  GalleryPhoto,
  GalleryPhotoSlug,
} from "../../../../src/types/galleryPhoto";
import { Location } from "../../../../src/types/location";

export const genericPhoto: GalleryPhoto = {
  title: "Photo",
  slug: GalleryPhotoSlug.parse("photo"),
  meta: {
    location: Location.parse(""),
    tags: [],
  },
  exif: {},
  settings: {},
};
