import { fileNameToPhotoTitle } from "../../../src/functions/photo";

describe("fileNameToPhotoTitle", () => {
  test("parses a JPEG file name", () => {
    expect(fileNameToPhotoTitle("Otter on a Rock.jpeg")).toBe(
      "Otter on a Rock"
    );
  });

  test("parses a JPEG title with brackets", () => {
    expect(fileNameToPhotoTitle("Gullfoss Upper Falls Detail (1).jpg")).toBe(
      "Gullfoss Upper Falls Detail"
    );
  });

  test("throws an error for non-JPEG file names", () => {
    expect(() => fileNameToPhotoTitle("New Document.txt")).toThrow(
      "File is not a JPEG: New Document.txt"
    );
  });
});
