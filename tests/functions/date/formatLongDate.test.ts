import { DateTime } from "luxon";
import { formatLongDate } from "../../../src/functions/date";

describe("formatLongDate", () => {
  const buildDate = (day: number): DateTime =>
    DateTime.fromObject({ year: 2023, month: 1, day });

  test("returns a long date format string", () => {
    expect(formatLongDate(buildDate(20))).toBe("20th January 2023");
  });
});
