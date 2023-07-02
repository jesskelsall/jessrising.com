import { DateTime } from "luxon";
import { dateFromSlug } from "../../../src/functions/date";

describe("dateFromSlug", () => {
  test("returns undefined for a slug without a timestamp", () => {
    expect(dateFromSlug("slug-without-timestamp")).toBeUndefined();
  });

  test("returns DateTime from a slug with a timestamp", () => {
    const date = dateFromSlug("2023-03-07-slug-with-timestamp");

    expect(date instanceof DateTime).toBeTruthy();
  });
});
