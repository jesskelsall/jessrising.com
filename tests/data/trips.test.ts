import { allGalleryPhotoSlugs } from "../../src/data/galleryPhotos";
import { allTripsList } from "../../src/data/trips";
import { Trip, TripSlug } from "../../src/types/trip";

describe("Trips", () => {
  const tripTests = allTripsList.map<[TripSlug, Trip]>((trip) => [
    trip.slug,
    trip,
  ]);

  describe.each(tripTests)("%s", (_slug, trip) => {
    test("Data matches schema", () => {
      expect(() => Trip.parse(trip)).not.toThrow();
    });

    test("Thumbnail is a gallery photo", () => {
      expect(allGalleryPhotoSlugs).toEqual(
        expect.arrayContaining([trip.thumbnail])
      );
    });
  });
});
