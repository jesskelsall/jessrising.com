import { LocationTitle } from "@/types/location";
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

const addLocation = (photo: GalleryPhoto, location: string): GalleryPhoto => ({
  ...photo,
  meta: {
    ...photo.meta,
    location: LocationTitle.parse(location),
  },
});

describe("isPhotoShown", () => {
  test("returns true with no tags", () => {
    expect(
      isPhotoShown({
        appliedLocationSlug: null,
        appliedTagSlugs: [],
        photo: GALLERY_PHOTO_EMPTY,
        tagsDict,
      })
    ).toBe(true);
  });

  test("returns true with shown tag", () => {
    const tagTitle = TagTitle.parse("Visibile");
    const photo = addTag(GALLERY_PHOTO_EMPTY, tagTitle);

    expect(
      isPhotoShown({
        appliedLocationSlug: null,
        appliedTagSlugs: [],
        photo,
        tagsDict,
      })
    ).toBe(true);
  });

  test("returns false with hidden tag", () => {
    const tagTitle = TagTitle.parse("Invisible");
    const photo = addTag(GALLERY_PHOTO_EMPTY, tagTitle);

    expect(
      isPhotoShown({
        appliedLocationSlug: null,
        appliedTagSlugs: [],
        photo,
        tagsDict,
      })
    ).toBe(false);
  });

  test("returns true with hidden tag and shown photo", () => {
    const tagTitle = TagTitle.parse("Invisible");
    const photo: GalleryPhoto = {
      ...addTag(GALLERY_PHOTO_EMPTY, tagTitle),
      settings: { showPhoto: true },
    };

    expect(
      isPhotoShown({
        appliedLocationSlug: null,
        appliedTagSlugs: [tagTitle],
        photo,
        tagsDict,
      })
    ).toBe(true);
  });

  test("returns false with hidden tag and nested location", () => {
    const tagTitle = TagTitle.parse("Invisible");
    const photo = addLocation(
      addTag(GALLERY_PHOTO_EMPTY, tagTitle),
      "Castlerigg Stone Circle"
    );

    expect(
      isPhotoShown({
        appliedLocationSlug: "central-fells",
        appliedTagSlugs: [],
        photo,
        tagsDict,
      })
    ).toBe(false);
  });

  test("returns true with hidden tag and exact location", () => {
    const tagTitle = TagTitle.parse("Invisible");
    const photo = addLocation(
      addTag(GALLERY_PHOTO_EMPTY, tagTitle),
      "Castlerigg Stone Circle"
    );

    expect(
      isPhotoShown({
        appliedLocationSlug: "castlerigg-stone-circle",
        appliedTagSlugs: [],
        photo,
        tagsDict,
      })
    ).toBe(true);
  });
});
