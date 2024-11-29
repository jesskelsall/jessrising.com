import { DateTime } from "luxon";
import { dateFromString } from "../../../src/functions/date";
import { ISO_DATE_STRING } from "./__fixtures__/dates";

describe("dateFromString", () => {
  const customDate = "07-03-2023";
  const customFormat = "dd-MM-yyyy";

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

  test("throws an error when date doesn't match default format", () => {
    expect(() => dateFromString(customDate)).toThrow(
      "Date could not be parsed"
    );
  });

  test("throws an error when date doesn't match custom format", () => {
    expect(() => dateFromString(ISO_DATE_STRING, customFormat)).toThrow(
      "Date could not be parsed"
    );
  });
});
