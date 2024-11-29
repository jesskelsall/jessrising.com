import { RationalTag, StringArrayTag, XmpTag } from "exifreader";
import { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import { GalleryPhotoSlug } from "../types/brand";
import { Camera } from "../types/camera";
import { EXIFLoaded } from "../types/EXIF";
import { GalleryPhoto, GalleryPhotoData } from "../types/galleryPhoto";
import { LocationTitle } from "../types/location";
import { Tag, TagsDict } from "../types/tag";
import { dateFromEXIFString } from "./date";

/**
 * Parses a file name into a photo title
 * @param fileName The name of a file e.g. "Otter on a Rock (1).jpeg"
 * @returns Photo title in its original case e.g. "Otter on a Rock"
 */
export const fileNameToPhotoTitle = (fileName: string): string => {
  const jpegSuffix = /( \(\d+\)|)\.jpe*g$/i;

  if (!fileName.match(jpegSuffix)) {
    throw new Error(`File is not a JPEG: ${fileName}`);
  }
  return fileName.replace(jpegSuffix, "");
};

/**
 * Parse a photo's title and date into its slug
 * @param title The title of a photo e.g. "Faraid Head Dunes"
 * @param date JS date object
 * @returns Photo slug e.g. "faraid-head-dunes-241129"
 */
export const buildPhotoSlug = (title: string, date: Date): GalleryPhotoSlug => {
  if (title.match(/^(DSC|IMG)/i)) {
    throw new Error(`Photo hasn't been named: ${title}`);
  }

  const dateTime = DateTime.fromJSDate(date);
  if (!dateTime.isValid) {
    throw new Error(`Invalid date for photo: ${title}`);
  }

  return GalleryPhotoSlug.parse(
    [kebabCase(title), dateTime.toFormat("yyLLdd")].join("-")
  );
};

/**
 * Simplifies getting a string from an EXIF tag
 * @param tag EXIF tag with one or more string values
 * @returns The first string value or undefined
 */
export const getExifFirstValue = (
  tag: StringArrayTag | XmpTag | undefined
): string | undefined => {
  if (tag === undefined) return undefined;
  const { value } = tag;

  if (typeof value === "string") return value;
  if (value instanceof Array && typeof value[0] === "string") return value[0];
  return undefined;
};

/**
 * Gets a number from an EXIF tag with a numeric value
 * @param tag EXIF rational tag with numbers tuple value
 * @returns Number or undefined
 */
export const getExifNumberValue = (
  tag: RationalTag | XmpTag | undefined
): number | undefined => {
  if (tag === undefined) return undefined;

  // Ignore XMP tags
  const castTag = tag as RationalTag;
  return castTag.value[0] / castTag.value[1];
};

// Parse a photo file's data into GalleryPhotoData
export const parsePhoto = ({
  cameras,
  exif,
  title,
}: {
  cameras: Camera[];
  exif: EXIFLoaded;
  title: string;
}): GalleryPhotoData => {
  const {
    DateTime: Date,
    ExposureBiasValue,
    ExposureTime,
    FNumber,
    FocalLength,
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef,
    "Image Height": Height,
    "Image Width": Width,
    ISOSpeedRatings,
    Lens,
    LensModel,
    Make,
    Model,
  } = exif;

  // Date

  const dateValue = getExifFirstValue(Date);
  if (!dateValue) throw new Error("Photo must include a date");
  const date = dateFromEXIFString(dateValue).toISO() as string;

  // Dimensions

  if (!Height?.value || !Width?.value) {
    throw new Error("Photo must include dimensions");
  }
  const height = Height.value;
  const width = Width.value;

  // Camera

  const make = getExifFirstValue(Make);
  const model = getExifFirstValue(Model);
  if (!make || !model) {
    throw new Error("Photo must include camera make & model");
  }

  const dataCamera = cameras.find(
    (camera) => camera.make === make && camera.model === model
  );
  if (!dataCamera) {
    throw new Error(
      `Photo must include recognised camera make & model: ${make} ${model}`
    );
  }

  // Lens

  const lensModel = getExifFirstValue(Lens ?? LensModel);
  if (!lensModel) throw new Error("Photo must include lens model");

  const dataLens = dataCamera.lenses.find((lens) => lens.model === lensModel);
  if (!dataLens)
    throw new Error(`Photo must include recognised lens model: ${lensModel}`);

  // Build required photo data

  const data: GalleryPhotoData = {
    title,
    meta: {
      location: LocationTitle.parse("Unknown"),
      tags: [],
      trip: null,
    },
    exif: {
      camera: {
        name: dataCamera.displayName,
        lens: dataLens.displayName,
      },
      date,
      dimensions: { height, width },
    },
  };

  // GPS

  if (GPSLatitude && GPSLatitudeRef && GPSLongitude && GPSLongitudeRef) {
    const lat =
      parseFloat(GPSLatitude.description) *
      (getExifFirstValue(GPSLatitudeRef) === "N" ? 1 : -1);
    const long =
      parseFloat(GPSLongitude.description) *
      (getExifFirstValue(GPSLongitudeRef) === "E" ? 1 : -1);

    if (!Number.isNaN(lat) && !Number.isNaN(long)) {
      data.meta.gps = { lat, long };
    }
  }

  // Camera settings

  // Most to least specific, off by default
  const includeSettings =
    dataLens.displaySettings ?? dataCamera.displaySettings ?? false;

  if (includeSettings) {
    const fStop = getExifNumberValue(FNumber);

    data.exif.camera.settings = {
      exposureBias: getExifNumberValue(ExposureBiasValue),
      exposureTime: getExifNumberValue(ExposureTime),
      focalLength: getExifNumberValue(FocalLength) || undefined,
      fStop: fStop !== 1 ? fStop : undefined,
      ISO:
        typeof ISOSpeedRatings?.value === "number"
          ? ISOSpeedRatings.value
          : undefined,
    };
  }

  return data;
};

/**
 * Determine if a photo should be shown based on its show/hide settings
 * Shown by default
 * hidePhotos: true can hide photos, but can be overriden by showPhoto: true setting
 */
export const isPhotoShown = (
  tagsDict: TagsDict,
  appliedTagSlugs: string[],
  photo: GalleryPhoto
): boolean => {
  // hidePhotos: true overrides all other settings
  if (photo.settings?.showPhoto) return true;

  const hidePhotoTagsOnPhoto = photo.meta.tags.reduce<Tag[]>(
    (tags, tagTitle) => {
      const tag = tagsDict[tagTitle];
      return tag?.hidePhotos ? [...tags, tag] : tags;
    },
    []
  );

  if (hidePhotoTagsOnPhoto.length === 0) return true;

  // Show if all of the hidden tags have been applied, hide otherwise
  const hidePhotoTagsAreApplied = hidePhotoTagsOnPhoto.every((tag) =>
    appliedTagSlugs.includes(tag.slug)
  );

  return hidePhotoTagsAreApplied;
};
