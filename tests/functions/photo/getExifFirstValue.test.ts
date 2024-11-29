import { StringArrayTag, XmpTag } from "exifreader";
import { getExifFirstValue } from "../../../src/functions/photo";

describe("getExifFirstValue", () => {
  test("returns the string when the tag value is a string", () => {
    const tag = { value: "value" } as XmpTag;
    expect(getExifFirstValue(tag)).toBe("value");
  });

  test("returns the first string when the tag value is an array of strings", () => {
    const tag = { value: ["first", "second"] } as StringArrayTag;
    expect(getExifFirstValue(tag)).toBe("first");
  });

  test("returns undefined for deeper nested XMP tags", () => {
    const tag = { value: { value: "value" } } as unknown as XmpTag;
    expect(getExifFirstValue(tag)).toBeUndefined();
  });

  test("returns undefined for undefined", () => {
    expect(getExifFirstValue(undefined)).toBeUndefined();
  });
});
