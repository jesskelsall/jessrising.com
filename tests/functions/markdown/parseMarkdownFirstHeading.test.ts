import { parseMarkdownFirstHeading } from "../../../src/functions/markdown";

describe("parseMarkdownFirstHeading", () => {
  test("returns line for heading 1 on first line", () => {
    const lines = ["# Heading 1A", "", "Content"];

    expect(parseMarkdownFirstHeading(lines)).toBe("Heading 1A");
  });

  test("returns line for heading 1 on any line", () => {
    const lines = [
      "Content",
      "More content",
      "",
      "# Heading 1B",
      "",
      "Even more content",
    ];

    expect(parseMarkdownFirstHeading(lines)).toBe("Heading 1B");
  });

  test("returns line for heading 2 on first line", () => {
    const lines = ["## Heading 2C", "", "Content"];

    expect(parseMarkdownFirstHeading(lines)).toBe("Heading 2C");
  });

  test("returns line for heading 2 on any line", () => {
    const lines = [
      "Content",
      "More content",
      "",
      "## Heading 2D",
      "",
      "Even more content",
    ];

    expect(parseMarkdownFirstHeading(lines)).toBe("Heading 2D");
  });

  test("returns undefined for lines with no headings", () => {
    const lines = ["Content", "", "More content"];

    expect(parseMarkdownFirstHeading(lines)).toBe(undefined);
  });
});
