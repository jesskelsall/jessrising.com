import { uniq } from "lodash/fp";
import { cameras } from "../../src/data/cameras";

describe("Cameras", () => {
  test("All cameras are unique by make and model", () => {
    const makeAndModels = cameras.map((camera) =>
      [camera.make, camera.model].join(" ")
    );

    expect(makeAndModels.length).toBe(uniq(makeAndModels).length);
  });

  test("All cameras are unique by display name", () => {
    const displayNames = cameras.map((camera) => camera.displayName);

    expect(displayNames.length).toBe(uniq(displayNames).length);
  });
});
