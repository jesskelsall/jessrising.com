import { APP_NAME } from "../../../src/consts/app";
import { SEPARATOR } from "../../../src/consts/text";
import { asPageTitle } from "../../../src/functions/title";

describe("asPageTitle", () => {
  test("returns page title and app name from a title", () => {
    const title = "Page Title";
    expect(asPageTitle(title)).toBe(`${title}${SEPARATOR}${APP_NAME}`);
  });

  test("returns app name only for an empty title", () => {
    expect(asPageTitle("")).toBe(APP_NAME);
  });

  test("returns app name only for no title", () => {
    expect(asPageTitle()).toBe(APP_NAME);
  });
});
