import { parsePhotoFileName } from "../../../src/functions/photo";

describe("parsePhotoFileName", () => {
  test("returns slug and title from photo file name", () => {
    expect(parsePhotoFileName("File Name.jpeg")).toEqual({
      slug: "file-name",
      title: "File Name",
    });
  });

  test("returns slug and title from photo file name with prefix", () => {
    expect(parsePhotoFileName("File Name With Prefix = 230802")).toEqual({
      slug: "file-name-with-prefix-230802",
      title: "File Name With Prefix",
    });
  });
});
