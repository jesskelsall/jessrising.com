import Joi from "joi";
import { last } from "lodash/fp";
import galleryPhotosJSON from "../../src/data/galleryPhotos.json";
import { locationHierarchy } from "../../src/data/locations";
import { IMarkdownData, TMarkdownDataFile } from "../../src/types/markdown";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;
const topLevelLocations = Object.keys(locationHierarchy);

const galleryPhotoSchema = Joi.object({
  date: Joi.string().optional(),
  markdown: Joi.string().required(),
  meta: Joi.object({
    gps: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    }).optional(),
    locations: Joi.array().required().min(1).items(Joi.string()),
    photo: Joi.object({
      camera: Joi.string().optional(),
      date: Joi.string().optional(),
      dimensions: Joi.object({
        height: Joi.number().required(),
        width: Joi.number().required(),
      }).optional(),
    }).required(),
    tags: Joi.array().min(0).items(Joi.string()).optional(),
  }).required(),
  slug: Joi.string().required(),
  summary: Joi.object({
    heading: Joi.string().optional(),
    imageSlug: Joi.string().optional(),
    paragraph: Joi.string().optional(),
  }).required(),
});

describe("Gallery Photos", () => {
  const galleryPhotoTests: [string, IMarkdownData][] = Object.values(
    galleryPhotosData
  ).map((galleryPhoto) => [galleryPhoto.slug, galleryPhoto]);

  describe.each(galleryPhotoTests)("%s", (_slug, galleryPhoto) => {
    test("Data matches schema", () => {
      expect(galleryPhoto).toMatchJoiSchema(galleryPhotoSchema);
    });

    test("Location is in location hierarchy", () => {
      const locationsList = galleryPhoto.meta.locations as string[];

      expect(locationsList).toBeInstanceOf(Array);
      expect(locationsList.length).toBeGreaterThan(0);
      expect(topLevelLocations).toContain(last(locationsList));
    });
  });
});
