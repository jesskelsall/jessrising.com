import { isPhotoShown } from "../../../src/functions/photo";
import { GalleryPhoto } from "../../../src/types/galleryPhoto";
import { TagId } from "../../../src/types/tag";
import { genericPhoto } from "./__fixtures__/photo";
import { tags } from "./__fixtures__/tags";

const addTag = (photo: GalleryPhoto, tagId: TagId): GalleryPhoto => ({
  ...photo,
  meta: {
    ...photo.meta,
    tags: [...photo.meta.tags, tagId],
  },
});

describe("isPhotoShown", () => {
  test("returns true with no tags", () => {
    expect(isPhotoShown(tags, [], genericPhoto)).toBe(true);
  });

  test("returns true with shown tag", () => {
    const tagId = TagId.parse("Visibile");
    const photo = addTag(genericPhoto, tagId);

    expect(isPhotoShown(tags, [tagId], photo)).toBe(true);
  });

  test("returns false with hidden tag", () => {
    const tagId = TagId.parse("Invisible");
    const photo = addTag(genericPhoto, tagId);

    expect(isPhotoShown(tags, [tagId], photo)).toBe(false);
  });

  test("returns true with hidden tag and shown photo", () => {
    const tagId = TagId.parse("Invisible");
    const photo: GalleryPhoto = {
      ...addTag(genericPhoto, tagId),
      settings: { showPhoto: true },
    };

    expect(isPhotoShown(tags, [tagId], photo)).toBe(true);
  });
});
