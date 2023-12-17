import { TagTitle, TagsDict } from "../../../../src/types/tag";

export const tagsDict: TagsDict = {
  Visible: {
    title: TagTitle.parse("Visible"),
    slug: "visible",
    index: 0,
  },
  Invisible: {
    title: TagTitle.parse("Invisible"),
    slug: "invisible",
    hidePhotos: true,
    index: 1,
  },
};
