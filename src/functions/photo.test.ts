import { getCameraDisplayName } from "./photo";

describe("getCameraDisplayName", () => {
  test("returns a known camera display name", () => {
    expect(getCameraDisplayName("Apple iPhone 14 Pro Max")).toBe(
      "iPhone 14 Pro Max"
    );
    expect(getCameraDisplayName("SONY ILCE-7RM5")).toBe("Sony ɑ7R V");
  });

  test("returns an unknown camera name as-is", () => {
    expect(getCameraDisplayName("Unknown")).toBe("Unknown");
  });
});
