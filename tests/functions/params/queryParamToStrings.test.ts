import { queryParamToStrings } from "../../../src/functions/params";

describe("queryParamToStrings", () => {
  test("returns empty array when param is undefined", () => {
    expect(queryParamToStrings(undefined)).toEqual([]);
  });

  test("returns array of one value when param is a string", () => {
    expect(queryParamToStrings("string")).toEqual(["string"]);
  });

  test("returns array of multiple values when param is an array", () => {
    expect(queryParamToStrings(["one", "two", "three"])).toEqual([
      "one",
      "two",
      "three",
    ]);
  });
});
