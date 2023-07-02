import { getDateOrdinal } from "../../../src/functions/date";

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
