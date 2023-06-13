import { last } from "lodash/fp";
import { TMarkdownDataFile } from "../types/markdown";
import galleryPhotosJSON from "./galleryPhotos.json";
import { locationHierarchy } from "./locations";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;
const topLevelLocations = Object.keys(locationHierarchy);

describe("Gallery Photos", () => {
  describe("Complete location hierarchy", () => {
    const tests = Object.values(galleryPhotosData).map((galleryPhoto) => [
      galleryPhoto.slug,
      galleryPhoto.meta.locations,
    ]);

    test.each(tests)("%s", (_slug, locations) => {
      const locationsList = locations as string[];

      expect(locationsList).toBeInstanceOf(Array);
      expect(locationsList.length).toBeGreaterThan(0);
      expect(topLevelLocations).toContain(last(locationsList));
    });
  });
});
