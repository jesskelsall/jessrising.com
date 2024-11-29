import { buildPhotoSlug } from "../../../src/functions/photo";

describe("buildPhotoSlug", () => {
  const date = new Date(2024, 10, 29, 14, 27, 10);

  test("returns a slug for a photo", () => {
    expect(buildPhotoSlug("Faraid Head Dunes", date)).toBe(
      "faraid-head-dunes-241129"
    );
  });

  test("throws an error when the title resembles an unnamed photo", () => {
    expect(() => buildPhotoSlug("DSC03659", date)).toThrow(
      "Photo hasn't been named: DSC03659"
    );
    expect(() => buildPhotoSlug("IMG_1014", date)).toThrow(
      "Photo hasn't been named: IMG_1014"
    );
  });

  test("throws an error for an invalid date", () => {
    expect(() => buildPhotoSlug("Title", new Date("Invalid"))).toThrow(
      "Invalid date for photo: Title"
    );
  });
});
