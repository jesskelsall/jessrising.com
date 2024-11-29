import { RationalTag } from "exifreader";
import { getExifNumberValue } from "../../../../src/functions/photo";

describe("getExifNumberValue", () => {
  test("returns the number when the tag value is a number tag", () => {
    const tag = { value: [20, 1] } as RationalTag;
    expect(getExifNumberValue(tag)).toBe(20);
  });

  test("returns undefined for undefined", () => {
    expect(getExifNumberValue(undefined)).toBeUndefined();
  });
});
