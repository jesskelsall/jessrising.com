import { GalleryPhotoSlug } from "../../../../src/types/brand";
import { GalleryPhoto } from "../../../../src/types/galleryPhoto";
import { Location } from "../../../../src/types/location";

export const genericPhoto: GalleryPhoto = {
  title: "Photo",
  slug: GalleryPhotoSlug.parse("photo"),
  meta: {
    location: Location.parse(""),
    tags: [],
    trip: null,
  },
  exif: {},
  settings: {},
};
