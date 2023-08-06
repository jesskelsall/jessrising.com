import { last } from "lodash/fp";
import { allGalleryPhotosList } from "../../src/data/galleryPhotos";
import { locationHierarchy } from "../../src/data/locations";
import { allTags } from "../../src/data/tags";
import { getLocationHierarchy } from "../../src/functions/location";
import { GalleryPhoto, GalleryPhotoSlug } from "../../src/types/galleryPhoto";

const topLevelLocations = Object.keys(locationHierarchy);

describe("Gallery Photos", () => {
  const galleryPhotoTests = allGalleryPhotosList.map<
    [GalleryPhotoSlug, GalleryPhoto]
  >((galleryPhoto) => [galleryPhoto.slug, galleryPhoto]);

  describe.each(galleryPhotoTests)("%s", (_slug, galleryPhoto) => {
    test("Data matches schema", () => {
      expect(() => GalleryPhoto.parse(galleryPhoto)).not.toThrow();
    });

    test("Location is in location hierarchy", () => {
      const locations = getLocationHierarchy(galleryPhoto.meta.location);

      expect(locations.length).toBeGreaterThan(0);
      expect(topLevelLocations).toContain(last(locations));
    });

    test("Tags are in tags list", () => {
      const tagIds = galleryPhoto.meta.tags;

      expect.assertions(tagIds.length);
      tagIds.forEach((tagId) => {
        const matchingTag = allTags.find((tag) => tag.id === tagId);
        expect(matchingTag).not.toBeUndefined();
      });
    });
  });
});
