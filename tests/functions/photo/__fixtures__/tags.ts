import { Tag, TagId } from "../../../../src/types/tag";

export const tags: Tag[] = [
  {
    id: TagId.parse("Visible"),
  },
  {
    id: TagId.parse("Invisible"),
    hidePhotos: true,
  },
];
