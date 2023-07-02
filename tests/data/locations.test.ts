import { groupBy, identity } from "lodash/fp";
import {
  ILocationHierarchy,
  locationHierarchy,
} from "../../src/data/locations";

describe("Locations", () => {
  test("All locations are unique", () => {
    // Get all locations
    const getLocationKeys = (object: ILocationHierarchy): string[] =>
      Object.keys(object)
        .map((key) => [key, ...getLocationKeys(object[`${key}`])])
        .flat();
    const allLocations = getLocationKeys(locationHierarchy).sort();

    // Get duplicate locations
    const groupedLocations = groupBy(identity, allLocations);
    const nonUniqueLocations = Object.values(groupedLocations)
      .filter((group) => group.length > 1)
      .map((group) => group[0]);

    expect(nonUniqueLocations).toEqual([]);
  });
});
