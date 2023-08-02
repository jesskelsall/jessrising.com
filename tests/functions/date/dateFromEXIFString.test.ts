import { DateTime } from "luxon";
import { MARKDOWN_DATA_EMPTY } from "../../../src/consts/data";
import { dateFromEXIFString, dateFromPhoto } from "../../../src/functions/date";
import { IMarkdownData } from "../../../src/types/markdownOld";
import { EXIF_DATE_STRING, ISO_DATE_STRING } from "./__fixtures__/dates";

describe("dateFromEXIFString", () => {
  test("returns DateTime for a EXIF date string", () => {
    const date = dateFromEXIFString(EXIF_DATE_STRING);

    expect(date instanceof DateTime).toBeTruthy();
  });
});

describe("dateFromPhoto", () => {
  test("returns undefined when meta.photo is undefined", () => {
    const dataWithoutPhoto: IMarkdownData = { ...MARKDOWN_DATA_EMPTY };

    expect(dateFromPhoto(dataWithoutPhoto)).toBeUndefined();
  });

  test("returns undefined when meta.photo.date is undefined", () => {
    const dataWithoutDate: IMarkdownData = {
      ...MARKDOWN_DATA_EMPTY,
      meta: { photo: {} },
    };

    expect(dateFromPhoto(dataWithoutDate)).toBeUndefined();
  });

  test("returns DateTime for a photo with a date", () => {
    const dataWithDate: IMarkdownData = {
      ...MARKDOWN_DATA_EMPTY,
      meta: { photo: { date: ISO_DATE_STRING } },
    };
    const date = dateFromPhoto(dataWithDate);

    expect(date instanceof DateTime).toBeTruthy();
  });
});
