import { lineIsContentLine } from "../../../src/functions/markdown";

describe("lineIsContentLine", () => {
  test("false if H1", () => {
    expect(lineIsContentLine("# Heading 1")).toBe(false);
  });

  test("false if empty line", () => {
    expect(lineIsContentLine("")).toBe(false);
    expect(lineIsContentLine(" ")).toBe(false);
  });

  test("true if unordered list", () => {
    expect(lineIsContentLine("- Unordered list")).toBe(true);
  });

  test("true if other content", () => {
    expect(lineIsContentLine("Paragraph")).toBe(true);
    expect(lineIsContentLine("1. Ordered list")).toBe(true);
    expect(lineIsContentLine("## Heading 2")).toBe(true);
  });
});
