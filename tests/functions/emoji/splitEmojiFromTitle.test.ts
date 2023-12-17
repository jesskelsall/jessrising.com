import { splitEmojiFromTitle } from "../../../src/functions/emoji";

describe("splitEmojiFromTitle", () => {
  test("returns text as title when no emoji prefix is present", () => {
    expect(splitEmojiFromTitle("Menai Bridge")).toEqual({
      title: "Menai Bridge",
    });
  });

  test("returns emoji and title when an emoji prefix is present", () => {
    expect(splitEmojiFromTitle("🦌 Cairngorm Reindeer Herd")).toEqual({
      emoji: "🦌",
      title: "Cairngorm Reindeer Herd",
    });
  });

  test("returns emoji and title when an emoji sequence prefix is present", () => {
    expect(splitEmojiFromTitle("🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales")).toEqual({
      emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
      title: "Wales",
    });

    expect(splitEmojiFromTitle("🇬🇧 United Kingdom")).toEqual({
      emoji: "🇬🇧",
      title: "United Kingdom",
    });
  });
});
