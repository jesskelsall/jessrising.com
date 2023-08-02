import { Camera } from "../../../../src/data/cameras";
import { EXIFLoaded } from "../../../../src/functions/EXIF";

export const generic = {
  DateTime: {
    id: 0,
    value: ["2023:01:01 00:00:00"],
    description: "2023:01:01 00:00:00",
  },
  ExposureBiasValue: { id: 0, value: [0, 1], description: "0" },
  ExposureTime: { id: 0, value: [1, 1], description: "1" },
  FNumber: { id: 0, value: [22, 1], description: "f/22" },
  FocalLength: { id: 0, value: [40, 1], description: "40 mm" },
  "Image Height": { value: 0, description: "4000px" },
  "Image Width": { value: 0, description: "3000px" },
  ISOSpeedRatings: { id: 0, value: 100, description: 100 },
  LensModel: { id: 0, value: ["Lens"], description: "Lens" },
  Make: { id: 0, value: ["Make"], description: "Make" },
  Model: { id: 0, value: ["Model"], description: "Model" },
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
