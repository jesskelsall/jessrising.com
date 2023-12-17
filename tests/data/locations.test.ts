import { groupBy, identity } from "lodash/fp";
import { locationHierarchy } from "../../src/data/locations";
import { splitEmojiFromTitle } from "../../src/functions/emoji";
import { LocationHierarchy } from "../../src/types/location";

describe("Locations", () => {
  test("All locations are unique", () => {
    // Get all locations without their emojis
    const getLocationKeys = (object: LocationHierarchy): string[] =>
      Object.keys(object)
        .map((key) => [key, ...getLocationKeys(object[`${key}`])])
        .flat();
    const allLocations = getLocationKeys(locationHierarchy)
      .map((locationKey) => splitEmojiFromTitle(locationKey).title)
      .sort();

    // Get duplicate locations
    const groupedLocations = groupBy(identity, allLocations);
    const nonUniqueLocations = Object.values(groupedLocations)
      .filter((group) => group.length > 1)
      .map((group) => group[0]);

    expect(nonUniqueLocations).toEqual([]);
  });
});
