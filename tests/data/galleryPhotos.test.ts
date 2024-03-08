import { last } from "lodash/fp";
import { allGalleryPhotosList } from "../../src/data/galleryPhotos";
import { allTags } from "../../src/data/tags";
import { allTripsDict } from "../../src/data/trips";
import { getLocationHierarchy } from "../../src/functions/locationsDict";
import { GalleryPhotoSlug } from "../../src/types/brand";
import { GalleryPhoto } from "../../src/types/galleryPhoto";

describe("Gallery Photos", () => {
  const galleryPhotoTests = allGalleryPhotosList.map<
    [GalleryPhotoSlug, GalleryPhoto]
  >((galleryPhoto) => [galleryPhoto.slug, galleryPhoto]);

  describe.each(galleryPhotoTests)("%s", (_slug, galleryPhoto) => {
    test("Data matches schema", () => {
      expect(() => GalleryPhoto.parse(galleryPhoto)).not.toThrow();
    });

    test("Location is null or in location hierarchy", () => {
      const { location } = galleryPhoto.meta;
      if (location === null) return;

      const locations = getLocationHierarchy(galleryPhoto.meta.location);

      expect(locations).not.toHaveLength(0);
      expect(last(locations)).not.toHaveProperty("parent");
    });

    test("Tags are in tags list", () => {
      const tagTitles = galleryPhoto.meta.tags;

      expect.assertions(tagTitles.length);
      tagTitles.forEach((tagTitle) => {
        const matchingTag = allTags.find((tag) => tag.title === tagTitle);
        expect(matchingTag).not.toBeUndefined();
      });
    });

    test("Trip is null or in trips list", () => {
      const { trip } = galleryPhoto.meta;

      expect.assertions(1);
      if (trip === null) {
        expect(trip).toBeNull();
      } else {
        const matchingTrip = allTripsDict[trip];
        expect(matchingTrip).not.toBeUndefined();
      }
    });
  });
});
