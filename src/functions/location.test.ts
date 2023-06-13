import { getLocationHierarchy } from "./location";

describe("getLocationHierarchy", () => {
  const topLevelLocation = "United Kingdom";
  const secondLevelLocation = "Scotland";

  test("returns empty array when location is an empty string", () => {
    expect(getLocationHierarchy("")).toEqual([]);
  });

  test("returns one string when location is top level", () => {
    expect(getLocationHierarchy(topLevelLocation)).toEqual([topLevelLocation]);
  });

  test("returns two strings when location is second level", () => {
    expect(getLocationHierarchy(secondLevelLocation)).toEqual([
      secondLevelLocation,
      topLevelLocation,
    ]);
  });
});
