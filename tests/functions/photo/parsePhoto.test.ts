import { cameras } from "../../../src/data/cameras";
import { parsePhoto } from "../../../src/functions/photo";
import { EXIFLoaded } from "../../../src/types/EXIF";
import { GalleryPhotoData } from "../../../src/types/galleryPhoto";
import { a550Wide } from "./__fixtures__/EXIF/a550Wide";
import { a550Zoom } from "./__fixtures__/EXIF/a550Zoom";
import { a7rvZoom } from "./__fixtures__/EXIF/a7rvZoom";
import { genericCameras, genericEXIF } from "./__fixtures__/EXIF/generic";
import { iPhone14Main } from "./__fixtures__/EXIF/iPhone14Main";

describe("parsePhoto", () => {
  const parseGeneric = (exif: EXIFLoaded) =>
    parsePhoto({
      cameras,
      exif,
      title: "Photo",
    });

  describe("Examples", () => {
    test("Parses minimal EXIF data", () => {
      const photo = parsePhoto({
        cameras,
        exif: genericEXIF,
        title: "Generic",
      });

      expect(() => GalleryPhotoData.parse(photo)).not.toThrow();
    });

    test("Parses an iPhone 14 Pro Max photo", () => {
      const photo = parsePhoto({
        cameras,
        exif: iPhone14Main,
        title: "Gaping Gill",
      });

      expect(() => GalleryPhotoData.parse(photo)).not.toThrow();
      expect(photo).toEqual({
        title: "Gaping Gill",
        meta: {
          location: "Unknown",
          tags: [],
          trip: null,
          gps: { lat: 54.14977777777778, long: -2.3823222222222222 },
        },
        exif: {
          camera: { name: "Apple iPhone 14 Pro Max", lens: "Main Camera" },
          date: "2023-06-01T09:46:34.000+01:00",
          dimensions: { height: 3024, width: 4032 },
        },
      });
    });

    test("Parses a Sony ɑ550 photo (zoom lens)", () => {
      const photo = parsePhoto({
        cameras,
        exif: a550Zoom,
        title: "Class 802 at Shap Summit",
      });

      expect(() => GalleryPhotoData.parse(photo)).not.toThrow();
      expect(photo).toEqual({
        title: "Class 802 at Shap Summit",
        meta: { location: "Unknown", tags: [], trip: null },
        exif: {
          camera: {
            name: "Sony ɑ550",
            lens: "Sony DT 18-55mm F3.5-5.6 SAM II",
            settings: {
              exposureBias: 0.3,
              exposureTime: 0.001,
              focalLength: 28,
              fStop: 5.6,
              ISO: 400,
            },
          },
          date: "2023-01-28T11:42:39.000+00:00",
          dimensions: { height: 3056, width: 4592 },
        },
      });
    });

    test("Parses a Sony ɑ550 photo (wide angle lens)", () => {
      const photo = parsePhoto({
        cameras,
        exif: a550Wide,
        title: "Northern Lights Over Strathy Point Lighthouse",
      });

      expect(() => GalleryPhotoData.parse(photo)).not.toThrow();
      expect(photo).toEqual({
        title: "Northern Lights Over Strathy Point Lighthouse",
        meta: {
          location: "Unknown",
          tags: [],
          trip: null,
        },
        exif: {
          camera: {
            name: "Sony ɑ550",
            lens: "Samyang 1:28 10mm ED AS NCS CS",
            settings: {
              exposureBias: 0,
              exposureTime: 10,
              ISO: 1600,
            },
          },
          date: "2023-04-21T23:31:27.000+01:00",
          dimensions: {
            height: 3012,
            width: 4526,
          },
        },
      });
    });

    test("Parses a Sony ɑ7R V photo", () => {
      const photo = parsePhoto({
        cameras,
        exif: a7rvZoom,
        title: "Clunes Forest",
      });

      expect(() => GalleryPhotoData.parse(photo)).not.toThrow();
      expect(photo).toEqual({
        title: "Clunes Forest",
        meta: { location: "Unknown", tags: [], trip: null },
        exif: {
          camera: {
            name: "Sony ɑ7R V",
            lens: "Sony FE 24-70mm F2.8 GM II",
            settings: {
              exposureBias: -0.3,
              exposureTime: 0.0125,
              focalLength: 70,
              fStop: 22,
              ISO: 640,
            },
          },
          date: "2023-07-30T08:41:16.000+01:00",
          dimensions: { height: 6246, width: 9370 },
        },
      });
    });
  });

  describe("Error handling", () => {
    test("throws an error for missing date", () => {
      const exif = { ...genericEXIF };
      delete exif.DateTime;

      expect(() => parseGeneric(exif)).toThrow("Photo must include a date");
    });

    test("throws an error for missing dimensions", () => {
      const noHeight = { ...genericEXIF };
      delete noHeight["Image Height"];

      expect(() => parseGeneric(noHeight)).toThrow(
        "Photo must include dimensions"
      );

      const noWidth = { ...genericEXIF };
      delete noWidth["Image Width"];

      expect(() => parseGeneric(noWidth)).toThrow(
        "Photo must include dimensions"
      );
    });

    test("throws an error for missing camera make & model", () => {
      const noMake = { ...genericEXIF };
      delete noMake.Make;

      expect(() => parseGeneric(noMake)).toThrow(
        "Photo must include camera make & model"
      );

      const noModel = { ...genericEXIF };
      delete noModel.Model;

      expect(() => parseGeneric(noModel)).toThrow(
        "Photo must include camera make & model"
      );
    });

    test("throws an error for unrecognised camera make & model", () => {
      const exif = { ...genericEXIF };
      exif.Model = { id: 0, description: "", value: ["Unknown"] };

      expect(() => parseGeneric(exif)).toThrow(
        "Photo must include recognised camera make & model: SONY Unknown"
      );
    });

    test("throws an error for missing lens model", () => {
      const exif = { ...genericEXIF };
      delete exif.Lens;

      expect(() => parseGeneric(exif)).toThrow("Photo must include lens model");
    });

    test("throws an error for unrecognised lens model", () => {
      const exif = { ...genericEXIF };
      exif.Lens = { value: "Unknown", attributes: {}, description: "" };

      expect(() => parseGeneric(exif)).toThrow(
        "Photo must include recognised lens model: Unknown"
      );
    });
  });

  describe("Include settings", () => {
    const genericCameraEXIF = { ...genericEXIF };
    genericCameraEXIF.Make = { id: 0, value: ["Make"], description: "" };
    genericCameraEXIF.Model = { id: 0, value: ["Model"], description: "" };
    genericCameraEXIF.Lens = { attributes: {}, value: "Lens", description: "" };

    test("settings hidden by default", () => {
      const modifiedCameras = [{ ...genericCameras[0] }];
      delete modifiedCameras[0].displaySettings;
      const photo = parsePhoto({
        cameras: modifiedCameras,
        exif: genericCameraEXIF,
        title: "Photo",
      });

      expect(photo.exif.camera).not.toHaveProperty("settings");
    });

    test("settings shown when enabled on camera", () => {
      const modifiedCameras = [{ ...genericCameras[0] }];
      modifiedCameras[0].displaySettings = true;
      const photo = parsePhoto({
        cameras: modifiedCameras,
        exif: genericCameraEXIF,
        title: "Photo",
      });

      expect(photo.exif.camera).toHaveProperty("settings");
    });

    test("settings hidden when enabled on camera but hidden on lens", () => {
      const modifiedCameras = [{ ...genericCameras[0] }];
      modifiedCameras[0].displaySettings = true;
      modifiedCameras[0].lenses[0].displaySettings = false;
      const photo = parsePhoto({
        cameras: modifiedCameras,
        exif: genericCameraEXIF,
        title: "Photo",
      });

      expect(photo.exif.camera).not.toHaveProperty("settings");
    });
  });

  describe("Edge cases", () => {
    test("ISO omitted if its value is an array", () => {
      const exif = { ...genericEXIF };
      exif.ISOSpeedRatings = { id: 0, value: [100], description: "" };
      const photo = parseGeneric(exif);

      expect(photo).toHaveProperty("exif.camera.settings");
      expect(photo.exif.camera.settings?.ISO).toBeUndefined();
    });

    test("GPS correct on other side of world", () => {
      const exif = {
        ...genericEXIF,
        GPSLatitude: iPhone14Main.GPSLatitude,
        GPSLatitudeRef: { ...iPhone14Main.GPSLatitudeRef, value: "S" },
        GPSLongitude: iPhone14Main.GPSLongitude,
        GPSLongitudeRef: { ...iPhone14Main.GPSLongitudeRef, value: "E" },
      } as EXIFLoaded;
      const photo = parseGeneric(exif);

      expect(photo.meta?.gps).toEqual({
        lat: -54.14977777777778,
        long: 2.3823222222222222,
      });
    });
  });
});
