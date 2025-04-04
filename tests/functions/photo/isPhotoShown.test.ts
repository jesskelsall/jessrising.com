import { GALLERY_PHOTO_EMPTY } from "../../../src/consts/data";
import { isPhotoShown } from "../../../src/functions/photo";
import { GalleryPhoto } from "../../../src/types/galleryPhoto";
import { TagTitle } from "../../../src/types/tag";
import { tagsDict } from "./__fixtures__/tags";

const addTag = (photo: GalleryPhoto, tagTitle: TagTitle): GalleryPhoto => ({
  ...photo,
  meta: {
    ...photo.meta,
    tags: [...photo.meta.tags, tagTitle],
  },
});

describe("isPhotoShown", () => {
  test("returns true with no tags", () => {
    expect(isPhotoShown(tagsDict, [], GALLERY_PHOTO_EMPTY)).toBe(true);
  });

  test("returns true with shown tag", () => {
    const tagTitle = TagTitle.parse("Visibile");
    const photo = addTag(GALLERY_PHOTO_EMPTY, tagTitle);

    expect(isPhotoShown(tagsDict, [], photo)).toBe(true);
  });

  test("returns false with hidden tag", () => {
    const tagTitle = TagTitle.parse("Invisible");
    const photo = addTag(GALLERY_PHOTO_EMPTY, tagTitle);

    expect(isPhotoShown(tagsDict, [], photo)).toBe(false);
  });

  test("returns true with hidden tag and shown photo", () => {
    const tagTitle = TagTitle.parse("Invisible");
    const photo: GalleryPhoto = {
      ...addTag(GALLERY_PHOTO_EMPTY, tagTitle),
      settings: { showPhoto: true },
    };

    expect(isPhotoShown(tagsDict, [tagTitle], photo)).toBe(true);
  });
});
