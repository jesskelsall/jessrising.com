import { parsePhotoTitle } from "../../../src/functions/photo";

describe("parsePhotoTitle", () => {
  test("returns title from a JPEG image file", () => {
    expect(parsePhotoTitle("Tyre Tracks in the Sand.jpeg")).toBe(
      "Tyre Tracks in the Sand"
    );
  });

  test("returns title from a duplicate file name", () => {
    expect(parsePhotoTitle("Sunset Over Balnakeil Bay (3).jpeg")).toBe(
      "Sunset Over Balnakeil Bay"
    );
  });
});
