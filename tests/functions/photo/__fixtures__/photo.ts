import { GalleryPhotoSlug } from "../../../../src/types/brand";
import { GalleryPhoto } from "../../../../src/types/galleryPhoto";

export const genericPhoto: GalleryPhoto = {
  title: "Photo",
  slug: GalleryPhotoSlug.parse("photo"),
  meta: {
    location: null,
    tags: [],
    trip: null,
  },
  exif: {},
  settings: {},
};
