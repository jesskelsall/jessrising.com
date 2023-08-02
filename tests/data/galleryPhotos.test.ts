import { last } from "lodash/fp";
import { allGalleryPhotosList } from "../../src/data/galleryPhotos";
import { locationHierarchy } from "../../src/data/locations";
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
  });
});
