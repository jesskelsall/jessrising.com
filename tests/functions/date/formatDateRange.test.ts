import { DateTime } from "luxon";
import { formatDateRange } from "../../../src/functions/date";

const createDate = (year: number, month: number, day: number): DateTime =>
  DateTime.fromObject({ year, month, day });

describe("formatDateRange", () => {
  const from = createDate(2023, 11, 18);

  test("returns a date when there is no to date", () => {
    expect(formatDateRange(from)).toBe("18th November 2023");
  });

  test("returns a date range when days in the month differ", () => {
    const to = createDate(2023, 11, 20);

    expect(formatDateRange(from, to)).toBe("18th to 20th November 2023");
  });

  test("returns a date range when months in the year differ", () => {
    const to = createDate(2023, 12, 1);

    expect(formatDateRange(from, to)).toBe(
      "18th November to 1st December 2023"
    );
  });

  test("returns a date range when years differ", () => {
    const to = createDate(2024, 2, 4);

    expect(formatDateRange(from, to)).toBe(
      "18th November 2023 to 4th February 2024"
    );
  });
});
