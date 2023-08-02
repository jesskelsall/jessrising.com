import { groupFileNamesBySlug } from "../../../src/functions/fs";

describe("groupFileNamesBySlug", () => {
  test("groups a single file", () => {
    const result = groupFileNamesBySlug(["file.json"]);

    expect(result).toEqual({
      file: ["json"],
    });
  });

  test("groups multiple files with different slugs", () => {
    const result = groupFileNamesBySlug(["one.json", "two.json"]);

    expect(result).toEqual({
      one: ["json"],
      two: ["json"],
    });
  });

  test("groups multiple files with different extensions", () => {
    const result = groupFileNamesBySlug(["file.json", "file.md"]);

    expect(result).toEqual({
      file: ["json", "md"],
    });
  });
});
