import { parseMarkdownListData } from "../../../src/functions/markdown";

describe("parseMarkdownListData", () => {
  test("Parses categories and values", () => {
    expect(parseMarkdownListData(["- First: Alpha", "- Second: Beta"])).toEqual(
      {
        First: ["Alpha"],
        Second: ["Beta"],
      }
    );
  });

  test("Parses categories with lists", () => {
    expect(parseMarkdownListData(["- List: One, Two, Three"])).toEqual({
      List: ["One", "Two", "Three"],
    });
  });

  test("Parses categories with no values", () => {
    expect(parseMarkdownListData(["- Blank:"])).toEqual({ Blank: [] });
  });

  test("Parses duplicate values", () => {
    expect(parseMarkdownListData(["- Category: Duplicate, Duplicate"])).toEqual(
      { Category: ["Duplicate", "Duplicate"] }
    );
  });

  test("Parses duplicate categories", () => {
    expect(
      parseMarkdownListData(["- Category: Alpha", "- Category: Omega"])
    ).toEqual({ Category: ["Alpha", "Omega"] });
  });

  test("Ignores lines with no category/value separator", () => {
    expect(parseMarkdownListData(["- Invalid"])).toEqual({});
  });
});
