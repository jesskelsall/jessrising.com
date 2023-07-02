import { extractMarkdownMetaLines } from "../../../src/functions/markdown";

describe("extractMarkdownMetaLines", () => {
  test("Extracts nothing when no meta list is present", () => {
    const lines = ["# Heading", "", "Content"];

    const result = extractMarkdownMetaLines(lines);
    expect(result.metaLines).toEqual([]);
    expect(result.otherLines).toEqual(lines);
  });

  test("Extracts nothing when a non-H1 element appears above the first list", () => {
    const lines = [
      "# Heading",
      "",
      "Content",
      "",
      "- List: Start",
      "- List: Middle",
      "- List: End",
      "",
      "More content",
    ];

    const result = extractMarkdownMetaLines(lines);
    expect(result.metaLines).toEqual([]);
    expect(result.otherLines).toEqual(lines);
  });

  test("Extracts meta lines when a meta list is correctly placed", () => {
    const lines = [
      "# Heading",
      "",
      "- List: Start",
      "- List: Middle",
      "- List: End",
      "",
      "Content",
    ];

    const result = extractMarkdownMetaLines(lines);
    expect(result.metaLines).toEqual(lines.slice(2, 5));
    expect(result.otherLines).toEqual([
      ...lines.slice(0, 2),
      ...lines.slice(5),
    ]);
  });
});
