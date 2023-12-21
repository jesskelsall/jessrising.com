import { allTags } from "../../../src/data/tags";
import { computeTags } from "../../../src/functions/tag";
import { TagsDict } from "../../../src/types/tag";

describe("computeTags", () => {
  let tagsDict: TagsDict;

  beforeAll(() => {
    tagsDict = computeTags(allTags);
  });

  test("Computes TagRaw to Tag", () => {
    const { Landscape } = tagsDict;

    expect(Landscape).toEqual(
      expect.objectContaining({
        emoji: "🏞️",
        title: "Landscape",
        slug: "landscape",
      })
    );
  });
});
