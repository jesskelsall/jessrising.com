import { APP_NAME } from "../../../src/consts/app";
import { SEPARATOR } from "../../../src/consts/text";
import { getRouteAsTitle } from "../../../src/functions/title";

describe("getRouteAsTitle", () => {
  test("returns app name for the base route", () => {
    expect(getRouteAsTitle("/")).toBe(APP_NAME);
  });

  test("returns page title annd app name for first level route", () => {
    expect(getRouteAsTitle("/first")).toBe(`First${SEPARATOR}${APP_NAME}`);
  });

  test("returns page title annd app name for second level route", () => {
    expect(getRouteAsTitle("/first/second")).toBe(
      `Second${SEPARATOR}${APP_NAME}`
    );
  });
});
