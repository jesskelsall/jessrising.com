import ExifReader from "exifreader";
import { Camera, Device } from "../data/cameras";
import { IEXIF } from "../types/galleryPhoto";
import { dateFromEXIFString } from "./date";

export type EXIFLoaded = ExifReader.Tags &
  ExifReader.XmpTags &
  ExifReader.IccTags;

export const getDevice = (
  devices: Device[],
  model: string,
  make?: string
): Device | undefined =>
  devices.find((device) => device.make === make && device.model === model);

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

export const parseEXIF = (cameras: Camera[], exif: EXIFLoaded): IEXIF => {
  const {
    DateTime: Date,
    ExposureBiasValue,
    ExposureTime,
    FNumber,
    FocalLength,
    "Image Height": Height,
    "Image Width": Width,
    ISOSpeedRatings,
    LensModel,
    Make,
    Model,
  } = exif;

  const exifData: IEXIF = {};

  // Timestamp

  if (firstValue(Date)) {
    const isoDate = dateFromEXIFString(firstValue(Date));
    if (isoDate?.isValid) exifData.date = isoDate.toISO();
  }

  // Dimensions

  if (Height?.value && Width?.value) {
    exifData.dimensions = {
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

    exifData.camera = {
      name: dataCamera ? dataCamera.displayName : [make, model].join(" "),
    };

    // Lens

    const lensModel = firstValue(LensModel);

    const dataLens = dataCamera?.lenses.find(
      (lens) => lens.model === lensModel
    );

    exifData.camera.lens = dataLens?.displayName || lensModel;

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
      exifData.camera.settings = {
        exposureBias: numberValue(ExposureBiasValue),
        exposureTime: numberValue(ExposureTime),
        focalLength: numberValue(FocalLength) || undefined,
        fStop: fStop !== 1 ? fStop : undefined,
        ISO: ISOSpeedRatings?.value,
      };
    }
  }

  return exifData;
};
