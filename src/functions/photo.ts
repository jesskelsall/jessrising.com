import { kebabCase } from "lodash/fp";
import { PHOTO_SUFFIX_SEPARATOR } from "../consts/photo";
import { Camera, Device } from "../data/cameras";
import { EXIFLoaded } from "../types/EXIF";
import {
  GalleryPhoto,
  GalleryPhotoData,
  GalleryPhotoSlug,
} from "../types/galleryPhoto";
import { Location } from "../types/location";
import { Tag, TagId } from "../types/tag";
import { dateFromEXIFString } from "./date";

// Gets a device that matches the given make and model
export const getDevice = (
  devices: Device[],
  model: string,
  make?: string
): Device | undefined =>
  devices.find((device) => device.make === make && device.model === model);

// Parse a photo file name into a slug and title
export const parsePhotoFileName = (
  fileName: string
): {
  slug: GalleryPhotoSlug;
  title: string;
} => {
  const [title, suffix] = fileName
    .replace(".jpeg", "")
    .split(PHOTO_SUFFIX_SEPARATOR);
  const isOriginalFileName =
    fileName.startsWith("IMG") || fileName.startsWith("DSC");
  const titleSlug = isOriginalFileName ? title : kebabCase(title);
  const slug = [titleSlug, ...(suffix ? [suffix] : [])].join("-");

  return { slug: GalleryPhotoSlug.parse(slug), title };
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
      location: Location.parse(""),
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
  tags: Tag[],
  appliedTagIds: TagId[],
  photo: GalleryPhoto
): boolean => {
  if (photo.settings?.showPhoto) return true;

  const hideTagIdsOnPhoto = photo.meta.tags.reduce<TagId[]>((acc, next) => {
    const tagData = tags.find((tag) => tag.id === next);
    return tagData?.hidePhotos
      ? [...acc, TagId.parse(kebabCase(tagData.id))]
      : acc;
  }, []);

  if (hideTagIdsOnPhoto.length === 0) return true;

  // Show if all of the hidden tags have been applied, hide otherwise
  const hideTagsAreApplied = hideTagIdsOnPhoto.every((tagId) =>
    appliedTagIds.includes(tagId)
  );

  return hideTagsAreApplied;
};
