import { kebabCase } from "lodash/fp";
import { Camera, Device } from "../data/cameras";
import { EXIFLoaded } from "../types/EXIF";
import { GalleryPhotoSlug } from "../types/brand";
import { GalleryPhoto, GalleryPhotoData } from "../types/galleryPhoto";
import { Tag, TagsDict } from "../types/tag";
import { dateFromEXIFString, dateFromString } from "./date";

// Gets a device that matches the given make and model
export const getDevice = (
  devices: Device[],
  model: string,
  make?: string
): Device | undefined =>
  devices.find((device) => device.make === make && device.model === model);

// Parse a photo file name into its title
export const parsePhotoTitle = (fileName: string): string =>
  fileName.replace(/( \(\d+\)|)\.jpeg$/i, "");

// Parse a photo title into its slug, pre-suffix
export const parsePhotoSlug = (
  title: string,
  date?: string
): GalleryPhotoSlug => {
  const isOriginalFileName = title.startsWith("IMG") || title.startsWith("DSC");
  if (isOriginalFileName) return GalleryPhotoSlug.parse(title);

  const slugParts = [kebabCase(title)];

  const dateSuffix = dateFromString(date)?.toFormat("yyLLdd") || "";
  if (dateSuffix) slugParts.push(dateSuffix);

  return GalleryPhotoSlug.parse(slugParts.join("-"));
};

const firstValue = (
  tag: ExifReader.StringArrayTag | undefined
): string | undefined => tag?.value[0];

const numberValue = (
  tag: ExifReader.NumberTag | undefined
): number | undefined => {
  // Numbers are actually tuples: [value, divisor]
  const castTag = tag as unknown as ExifReader.NumberArrayTag;
  if (!castTag?.value) return undefined;
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

  // Empty gallery photo

  const data: GalleryPhotoData = {
    title,
    meta: {
      location: null,
      tags: [],
      trip: null,
    },
    exif: {},
  };

  // Timestamp

  if (firstValue(Date)) {
    const isoDate = dateFromEXIFString(firstValue(Date));
    if (isoDate?.isValid) data.exif.date = isoDate.toISO();
  }

  // Dimensions

  if (Height?.value && Width?.value) {
    data.exif.dimensions = {
      height: parseInt(Height.value, 10),
      width: parseInt(Width.value, 10),
    };
  }

  // GPS

  if (GPSLatitude && GPSLatitudeRef && GPSLongitude && GPSLongitudeRef) {
    const lat =
      parseFloat(GPSLatitude.description) *
      (firstValue(GPSLatitudeRef) === "N" ? 1 : -1);
    const long =
      parseFloat(GPSLongitude.description) *
      (firstValue(GPSLongitudeRef) === "E" ? 1 : -1);

    if (!Number.isNaN(lat) && !Number.isNaN(long)) {
      data.meta.gps = { lat, long };
    }
  }

  // Camera

  if (firstValue(Make) && firstValue(Model)) {
    // Make & Model

    const make = firstValue(Make);
    const model = firstValue(Model);

    const dataCamera = cameras.find(
      (camera) => camera.make === make && camera.model === model
    );

    data.exif.camera = {
      name: dataCamera ? dataCamera.displayName : [make, model].join(" "),
    };

    // Lens

    const lensModel = Lens ? Lens.value : firstValue(LensModel);

    const dataLens = dataCamera?.lenses.find(
      (lens) => lens.model === lensModel
    );

    data.exif.camera.lens = dataLens?.displayName || lensModel;

    // Settings

    let includeSettings = false;
    if (dataCamera?.displaySettings !== undefined) {
      includeSettings = dataCamera.displaySettings;
    }
    if (dataLens?.displaySettings !== undefined) {
      includeSettings = dataLens.displaySettings;
    }

    const fStop = numberValue(FNumber);

    if (includeSettings) {
      data.exif.camera.settings = {
        exposureBias: numberValue(ExposureBiasValue),
        exposureTime: numberValue(ExposureTime),
        focalLength: numberValue(FocalLength) || undefined,
        fStop: fStop !== 1 ? fStop : undefined,
        ISO: ISOSpeedRatings?.value,
      };
    }
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
