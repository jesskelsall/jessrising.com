import { Camera } from "../types/camera";

/**
 * Any camera and lens used to take photos must be defined here
 * displaySettings is off by default. Lens value overrides camera value.
 */
export const cameras: Camera[] = [
  {
    displayName: "Apple iPhone 11 Pro Max",
    displaySettings: false,
    make: "Apple",
    model: "iPhone 11 Pro Max",
    lenses: [
      {
        displayName: "Ultra Wide Camera",
        make: "Apple",
        model: "iPhone 11 Pro Max back triple camera 1.54mm f/2.4",
      },
      {
        displayName: "Main Camera",
        make: "Apple",
        model: "iPhone 11 Pro Max back triple camera 4.25mm f/1.8",
      },
      {
        displayName: "Telephoto Camera",
        make: "Apple",
        model: "iPhone 11 Pro Max back triple camera 6mm f/2",
      },
    ],
  },
  {
    displayName: "Apple iPhone 14 Pro Max",
    displaySettings: false,
    make: "Apple",
    model: "iPhone 14 Pro Max",
    lenses: [
      {
        displayName: "Main Camera",
        make: "Apple",
        model: "iPhone 14 Pro Max back triple camera 6.86mm f/1.78",
      },
    ],
  },
  {
    displayName: "Sony ɑ550",
    displaySettings: true,
    make: "SONY",
    model: "DSLR-A550",
    lenses: [
      {
        displayName: "Sony DT 18-55mm F3.5-5.6 SAM II",
        model: "Sony DT 18-55mm F3.5-5.6 SAM [II] (SAL1855)",
      },
      {
        displayName: "Samyang 1:28 10mm ED AS NCS CS",
        model: "Sony 0mm F0.0",
      },
    ],
  },
  {
    displayName: "Sony ɑ7R V",
    displaySettings: true,
    make: "SONY",
    model: "ILCE-7RM5",
    lenses: [
      {
        displayName: "Sony FE 24-70mm F2.8 GM II",
        model: "Sony FE 24-70mm F2.8 II",
      },
      {
        displayName: "Sony FE 24mm F1.4 GM",
        model: "Sony FE 24mm F1.4",
      },
      {
        displayName: "Sony FE 100-400mm GM",
        model: "Sony FE 100-400mm F4.5-5.6 OSS",
      },
      {
        displayName: "Sony FE 100-400mm GM + 1.4x Teleconverter Lens",
        model: "Sony FE 140-560mm F6.3-8.0 OSS",
      },
    ],
  },
];
