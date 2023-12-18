import { getLocationHierarchy } from "../../../src/functions/locationsDict";
import { Emoji } from "../../../src/types/emoji";
import { Location, LocationTitle } from "../../../src/types/location";

const UnitedKingdom: Location = {
  emoji: Emoji.parse("🇬🇧"),
  slug: "united-kingdom",
  title: LocationTitle.parse("United Kingdom"),
};

const Scotland: Location = {
  emoji: Emoji.parse("🏴󠁧󠁢󠁳󠁣󠁴󠁿"),
  slug: "scotland",
  title: LocationTitle.parse("Scotland"),
  parent: LocationTitle.parse("United Kingdom"),
};

describe("getLocationHierarchy", () => {
  const topLevelLocation = LocationTitle.parse("United Kingdom");
  const secondLevelLocation = LocationTitle.parse("Scotland");

  test("returns empty array when location is an empty string", () => {
    const emptyLocation = LocationTitle.parse("");

    expect(getLocationHierarchy(emptyLocation)).toEqual([]);
  });

  test("returns empty array when location is unknown", () => {
    const unknownLocation = LocationTitle.parse("Unknown Location");
    expect(getLocationHierarchy(unknownLocation)).toEqual([]);
  });

  test("returns one string when location is top level", () => {
    expect(getLocationHierarchy(topLevelLocation)).toEqual([UnitedKingdom]);
  });

  test("returns two strings when location is second level", () => {
    expect(getLocationHierarchy(secondLevelLocation)).toEqual([
      Scotland,
      UnitedKingdom,
    ]);
  });
});
