import { Camera, cameras as allCameras } from "../../../src/data/cameras";
import { parsePhoto } from "../../../src/functions/photo";
import { EXIFLoaded } from "../../../src/types/EXIF";
import { a550Wide } from "./__fixtures__/a550Wide";
import { a7rvZoom } from "./__fixtures__/a7rvZoom";
import { generic, genericCameras } from "./__fixtures__/generic";
import { iPhone14Main } from "./__fixtures__/iPhone14Main";

const title = "Title";

describe("parsePhoto", () => {
  describe("Defaults", () => {
    test("title and meta initialised", () => {
      const result = parsePhoto({
        cameras: allCameras,
        exif: generic,
        title,
      });

      expect(result).toMatchObject(
        expect.objectContaining({
          title,
          meta: {
            gps: { lat: 0, long: 0 },
            location: "",
            tags: [],
          },
        })
      );
    });
  });

  describe("Tags", () => {
    test("Camera make and model from tags when not in cameras", () => {
      const cameras: Camera[] = [];
      const result = parsePhoto({
        cameras,
        exif: generic,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toMatchObject(
        expect.objectContaining({
          camera: expect.objectContaining({
            name: "Make Model",
          }),
        })
      );
    });

    test("No tag on missing number value", () => {
      const exif = {
        ...generic,
        ExposureBiasValue: {
          ...generic.ExposureBiasValue,
          value: undefined,
        },
      } as unknown as EXIFLoaded;
      const result = parsePhoto({
        cameras: genericCameras,
        exif,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toMatchObject(
        expect.objectContaining({
          camera: expect.objectContaining({
            settings: expect.objectContaining({
              exposureBias: undefined,
            }),
          }),
        })
      );
    });

    test("Display settings if enabled on camera", () => {
      const result = parsePhoto({
        cameras: genericCameras,
        exif: generic,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toMatchObject(
        expect.objectContaining({
          camera: expect.objectContaining({
            settings: expect.objectContaining({}),
          }),
        })
      );
    });

    test("Display settings if enabled on lens", () => {
      const cameras: Camera[] = [
        {
          ...genericCameras[0],
          displaySettings: false,
          lenses: [{ ...genericCameras[0].lenses[0], displaySettings: true }],
        },
      ];
      const result = parsePhoto({
        cameras,
        exif: generic,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toMatchObject(
        expect.objectContaining({
          camera: expect.objectContaining({
            settings: expect.objectContaining({}),
          }),
        })
      );
    });

    test("Display settings if disabled on lens", () => {
      const cameras: Camera[] = [
        {
          ...genericCameras[0],
          displaySettings: true,
          lenses: [{ ...genericCameras[0].lenses[0], displaySettings: false }],
        },
      ];
      const result = parsePhoto({
        cameras,
        exif: generic,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toMatchObject(
        expect.objectContaining({
          camera: expect.objectContaining({}),
        })
      );
      expect(result.exif.camera).not.toHaveProperty("settings");
    });
  });

  describe("Devices", () => {
    test("Sony ɑ7R V ∙ Sony FE 24-70mm F2.8 GM II", () => {
      const result = parsePhoto({
        cameras: allCameras,
        exif: a7rvZoom,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toEqual({
        camera: {
          lens: "Sony FE 24-70mm F2.8 GM II",
          name: "Sony ɑ7R V",
          settings: {
            ISO: 640,
            exposureBias: -0.3,
            exposureTime: 0.0125,
            fStop: 22,
            focalLength: 70,
          },
        },
        date: "2023-07-30T08:41:16.000+01:00",
        dimensions: {
          height: 6336,
          width: 9504,
        },
      });
    });

    test("Sony ɑ550 ∙ Samyang 1:28 10mm ED AS NCS CS", () => {
      const result = parsePhoto({
        cameras: allCameras,
        exif: a550Wide,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toEqual({
        camera: {
          lens: undefined,
          name: "Sony ɑ550",
          settings: {
            ISO: 1600,
            exposureBias: 0,
            exposureTime: 10,
            fStop: undefined,
            focalLength: undefined,
          },
        },
        date: "2023-04-21T23:31:27.000+01:00",
        dimensions: {
          height: 3012,
          width: 4526,
        },
      });
    });

    test("iPhone 14 Pro Max ∙ Main Camera", () => {
      const result = parsePhoto({
        cameras: allCameras,
        exif: iPhone14Main,
        title,
      });

      expect(result).toHaveProperty("exif");
      expect(result.exif).toEqual({
        camera: {
          lens: "Main Camera",
          name: "Apple iPhone 14 Pro Max",
        },
        date: "2023-06-01T09:44:51.000+01:00",
        dimensions: {
          height: 4032,
          width: 3024,
        },
      });
    });
  });
});
