import { DateTime } from "luxon";
import { dateFromEXIFString } from "../../../src/functions/date";
import { EXIF_DATE_STRING } from "./__fixtures__/dates";

describe("dateFromEXIFString", () => {
  test("returns DateTime for a EXIF date string", () => {
    const date = dateFromEXIFString(EXIF_DATE_STRING);

    expect(date instanceof DateTime).toBeTruthy();
  });
});
