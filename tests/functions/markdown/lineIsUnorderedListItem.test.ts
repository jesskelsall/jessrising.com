import { lineIsUnorderedListItem } from "../../../src/functions/markdown";

describe("lineIsUnorderedListItem", () => {
  test("true for list lines", () => {
    expect(lineIsUnorderedListItem("- List line")).toBe(true);
    expect(lineIsUnorderedListItem("- ")).toBe(true);
  });

  test("false for other lines", () => {
    expect(lineIsUnorderedListItem("")).toBe(false);
    expect(lineIsUnorderedListItem("# Other line")).toBe(false);
    expect(lineIsUnorderedListItem("1. Other line")).toBe(false);
    expect(lineIsUnorderedListItem("---")).toBe(false);
  });
});
