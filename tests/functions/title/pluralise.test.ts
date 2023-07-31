import { pluralise } from "../../../src/functions/title";

describe("pluralise", () => {
  const [singular, plural] = ["Page", "Pages"];
  const curried = (quantity: number) => pluralise(singular, plural, quantity);

  test("returns singular for quantity of 1", () => {
    expect(curried(1)).toBe(singular);
  });

  test("returns plural for other quantities", () => {
    expect(curried(0)).toBe(plural);
    expect(curried(2)).toBe(plural);
    expect(curried(10)).toBe(plural);
  });
});
