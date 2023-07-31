import { titleCase } from "../../../src/functions/title";

describe("titleCase", () => {
  test("returns title cased string from slug", () => {
    expect(titleCase("the-title-of-my-article")).toBe(
      "The Title of My Article"
    );
  });
  test("returns title cased string from lower case", () => {
    expect(titleCase("the title of my article")).toBe(
      "The Title of My Article"
    );
  });
  test("returns title cased string from start case", () => {
    expect(titleCase("The Title Of My Article")).toBe(
      "The Title of My Article"
    );
  });
});
