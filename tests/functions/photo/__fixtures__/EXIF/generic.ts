import { Camera } from "../../../../../src/types/camera";
import { EXIFLoaded } from "../../../../../src/types/EXIF";

export const genericEXIF = {
  DateTime: {
    id: 0,
    value: ["2023:01:01 00:00:00"],
    description: "2023:01:01 00:00:00",
  },
  ExposureBiasValue: { id: 0, value: [0, 1], description: "0" },
  ExposureTime: { id: 0, value: [1, 1], description: "1" },
  FNumber: { id: 0, value: [22, 1], description: "f/22" },
  FocalLength: { id: 0, value: [40, 1], description: "40 mm" },
  "Image Height": { value: 4000, description: "4000px" },
  "Image Width": { value: 3000, description: "3000px" },
  ISOSpeedRatings: { id: 0, value: 100, description: 100 },
  Lens: {
    value: "Sony FE 24-70mm F2.8 II",
    attributes: {},
    description: "Sony FE 24-70mm F2.8 II",
  },
  Make: { id: 271, value: ["SONY"], description: "SONY" },
  Model: { id: 272, value: ["ILCE-7RM5"], description: "ILCE-7RM5" },
} as unknown as EXIFLoaded;

export const genericCameras: Camera[] = [
  {
    make: "Make",
    model: "Model",
    displayName: "Camera Display Name",
    displaySettings: true,
    lenses: [
      {
        model: "Lens",
        displayName: "Lens Display Name",
      },
    ],
  },
];
