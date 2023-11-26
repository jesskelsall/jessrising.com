import { parsePhotoSlug } from "../../../src/functions/photo";

describe("parsePhotoSlug", () => {
  const date = "2023-11-26T15:30:03.355Z";

  test("returns a slug for a title but no date", () => {
    expect(parsePhotoSlug("Faraid Head Dunes", undefined)).toBe(
      "faraid-head-dunes"
    );
  });

  test("returns a slug for an original photo title", () => {
    expect(parsePhotoSlug("DSC02445", date)).toBe("DSC02445");
  });

  test("returns a slug and suffix for a title and date", () => {
    expect(parsePhotoSlug("The Deer on the Beach", date)).toBe(
      "the-deer-on-the-beach-231126"
    );
  });
});
