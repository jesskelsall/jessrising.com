import { locationHierarchy } from "../../../src/data/locations";
import { computeLocations } from "../../../src/functions/location";
import { LocationsDict } from "../../../src/types/location";

describe("computeLocations", () => {
  let locationsDict: LocationsDict;

  beforeAll(() => {
    locationsDict = computeLocations(locationHierarchy);
  });

  test("Separates emoji from title", () => {
    const UK = locationsDict["United Kingdom"];

    expect(UK).toEqual(
      expect.objectContaining({
        emoji: "🇬🇧",
        title: "United Kingdom",
      })
    );
  });

  test("Top-level countries have no parent", () => {
    const UK = locationsDict["United Kingdom"];

    expect(UK.parent).toBeUndefined();
  });

  test("Includes parent titles", () => {
    const CountyDurham = locationsDict["County Durham"];

    expect(CountyDurham).toEqual(
      expect.objectContaining({
        parent: "England",
      })
    );
  });
});
