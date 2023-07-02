import { expandRange } from "../../../src/functions/params";

describe("expandRange", () => {
  describe("single param", () => {
    test("returns a single number", () => {
      expect(expandRange("5")).toEqual([5]);
    });

    test("returns multiple numbers", () => {
      expect(expandRange("2,4")).toEqual([2, 4]);
    });

    test("returns an expanded range", () => {
      expect(expandRange("1-5")).toEqual([1, 2, 3, 4, 5]);
    });

    test("returns an expanded inverse range", () => {
      expect(expandRange("10-7")).toEqual([10, 9, 8, 7]);
    });

    test("returns multiple expanded ranges", () => {
      expect(expandRange("1-2,8-9")).toEqual([1, 2, 8, 9]);
    });

    test("returns a mix of numbers and expanded ranges", () => {
      expect(expandRange("1, 2, 3, 5-7")).toEqual([1, 2, 3, 5, 6, 7]);
    });
  });

  describe("multiple params", () => {
    test("returns multiple numbers", () => {
      expect(expandRange(["1", "10"])).toEqual([1, 10]);
    });

    test("returns multiple expanded ranges", () => {
      expect(expandRange(["12-15", "3-4"])).toEqual([12, 13, 14, 15, 3, 4]);
    });

    test("returns a mix of numbers and expanded ranges", () => {
      expect(expandRange(["20", "29-31"])).toEqual([20, 29, 30, 31]);
    });
  });

  describe("overlapping ranges", () => {
    test("returns unique values for numbers", () => {
      expect(expandRange("7,7")).toEqual([7]);
    });

    test("returns unique values for overlapping ranges", () => {
      expect(expandRange("4-6,1-5")).toEqual([4, 5, 6, 1, 2, 3]);
    });

    test("returns unique values for overlapping numbers and ranges", () => {
      expect(expandRange("15,13-17")).toEqual([15, 13, 14, 16, 17]);
    });

    test("returns unique values for ranges of one number", () => {
      expect(expandRange("3-3")).toEqual([3]);
    });
  });

  describe("invalid numbers", () => {
    test("returns an empty array when a number is negative", () => {
      expect(expandRange("-7")).toEqual([]);
    });

    test("returns an empty array when not parseable as a number", () => {
      expect(expandRange("string")).toEqual([]);
      expect(expandRange("2-x")).toEqual([]);
    });

    test("returns an empty array when a range has multiple hyphens", () => {
      expect(expandRange("-3-0")).toEqual([]);
      expect(expandRange("1-3-7")).toEqual([]);
    });
  });
});
