import { DateTime } from "luxon";
import { MARKDOWN_DATA_EMPTY } from "../consts/data";
import { IMarkdownData } from "../types/markdown";
import {
  dateFromEXIFString,
  dateFromPhoto,
  dateFromSlug,
  dateFromString,
  formatLongDate,
  getDateOrdinal,
} from "./date";

const EXIF_DATE_STRING = "2023:03:07 21:34:06";
const ISO_DATE_STRING = "2023-03-07T21:34:06.327Z";

describe("dateFromString", () => {
  const customDate = "07-03-2023";
  const customFormat = "dd-MM-yyyy";

  test("returns undefined when dateString is null", () => {
    expect(dateFromString(null)).toBeUndefined();
  });

  test("returns undefined when dateString is undefined", () => {
    expect(dateFromString(undefined)).toBeUndefined();
  });

  test("returns undefined when date doesn't match default format", () => {
    expect(dateFromString(customDate)).toBeUndefined();
  });

  test("returns undefined when date doesn't match custom format", () => {
    expect(dateFromString(ISO_DATE_STRING, customFormat)).toBeUndefined();
  });

  test("returns a DateTime for the default format", () => {
    const date = dateFromString(ISO_DATE_STRING);

    expect(date instanceof DateTime).toBeTruthy();

    expect(date?.year).toEqual(2023);
    expect(date?.month).toEqual(3);
    expect(date?.day).toEqual(7);
    expect(date?.hour).toEqual(21);
    expect(date?.minute).toEqual(34);
    expect(date?.second).toEqual(6);
  });

  test("returns a DateTime for a custom format", () => {
    const date = dateFromString(customDate, customFormat);

    expect(date instanceof DateTime).toBeTruthy();

    expect(date?.year).toEqual(2023);
    expect(date?.month).toEqual(3);
    expect(date?.day).toEqual(7);
  });

  test("returns DateTime with the en-GB locale", () => {
    expect(dateFromString(ISO_DATE_STRING)?.locale).toBe("en-GB");
  });
});

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

describe("dateFromSlug", () => {
  test("returns undefined for a slug without a timestamp", () => {
    expect(dateFromSlug("slug-without-timestamp")).toBeUndefined();
  });

  test("returns DateTime from a slug with a timestamp", () => {
    const date = dateFromSlug("2023-03-07-slug-with-timestamp");

    expect(date instanceof DateTime).toBeTruthy();
  });
});

describe("formatLongDate", () => {
  const buildDate = (day: number): DateTime =>
    DateTime.fromObject({ year: 2023, month: 1, day });

  test("returns a long date format string", () => {
    expect(formatLongDate(buildDate(20))).toBe("20th January 2023");
  });
});

describe("getDateOrdinal", () => {
  const ordinalTests: [string, number][] = [
    ["st", 1],
    ["nd", 2],
    ["rd", 3],
    ["th", 4],
    ["th", 5],
    ["th", 10],
    ["th", 11],
    ["th", 12],
    ["th", 13],
    ["th", 20],
    ["st", 21],
    ["nd", 22],
    ["rd", 23],
    ["th", 24],
    ["th", 30],
    ["st", 31],
  ];

  test.each(ordinalTests)("returns %s for day %d", (expected, day) => {
    expect(getDateOrdinal(day)).toBe(expected);
  });
});
