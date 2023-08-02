import { DateTime } from "luxon";
import { dateFromGalleryPhoto } from "../../../src/functions/date";
import { GalleryPhoto } from "../../../src/types/galleryPhoto";
import { ISO_DATE_STRING } from "./__fixtures__/dates";

describe("dateFromGalleryPhoto", () => {
  test("returns undefined when exif.date is undefined", () => {
    const galleryPhoto = {
      exif: {},
    } as unknown as GalleryPhoto;

    expect(dateFromGalleryPhoto(galleryPhoto)).toBeUndefined();
  });

  test("returns DateTime for a photo with a date", () => {
    const galleryPhoto = {
      exif: { date: ISO_DATE_STRING },
    } as unknown as GalleryPhoto;

    expect(dateFromGalleryPhoto(galleryPhoto)).toBeInstanceOf(DateTime);
  });
});
