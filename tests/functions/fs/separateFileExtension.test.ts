import { separateFileExtension } from "../../../src/functions/fs";

describe("separateFileExtension", () => {
  test("splits extension from a file name", () => {
    expect(separateFileExtension("file.jpeg")).toEqual(["file", "jpeg"]);
    expect(separateFileExtension("File Name.json")).toEqual([
      "File Name",
      "json",
    ]);
    expect(separateFileExtension("separateFileExtension.test.ts")).toEqual([
      "separateFileExtension.test",
      "ts",
    ]);
  });

  test("returns an intact file name that has no extension", () => {
    expect(separateFileExtension("file")).toEqual(["file", ""]);
  });
});
