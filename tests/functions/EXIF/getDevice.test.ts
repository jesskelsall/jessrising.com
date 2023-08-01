import { cameras } from "../../../src/data/cameras";
import { getDevice } from "../../../src/functions/EXIF";

describe("getDevice", () => {
  test("returns device from make and model", () => {
    const iPhone14ProMax = cameras.find(
      (camera) => camera.displayName === "iPhone 14 Pro Max"
    );

    expect(iPhone14ProMax).not.toBeUndefined();
    expect(
      getDevice(cameras, iPhone14ProMax!.model, iPhone14ProMax!.make)
    ).toEqual(iPhone14ProMax);
  });

  test("returns device from model only", () => {
    const sonyA7rV = cameras.find(
      (camera) => camera.displayName === "Sony ɑ7R V"
    );
    const zoomLens = sonyA7rV?.lenses.find(
      (lens) => lens.displayName === "Sony FE 24-70mm F2.8 GM II"
    );

    expect(zoomLens).not.toBeUndefined();
    expect(getDevice(sonyA7rV!.lenses, zoomLens!.model)).toEqual(zoomLens);
  });

  test("returns undefined when no match", () => {
    expect(getDevice(cameras, "Model", "Make")).toBeUndefined();
  });
});
