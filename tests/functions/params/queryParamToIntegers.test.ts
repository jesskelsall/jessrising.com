import { queryParamToIntegers } from "../../../src/functions/params";

describe("queryParamToIntegers", () => {
  test("returns empty array when param is undefined", () => {
    expect(queryParamToIntegers(undefined)).toEqual([]);
  });

  test("returns array of numbers when param is numbers", () => {
    expect(queryParamToIntegers(["5", "6", "7.2"])).toEqual([5, 6, 7]);
  });

  test("returns array without param when param is not a number", () => {
    expect(queryParamToIntegers(["0", "string"])).toEqual([0]);
  });
});
