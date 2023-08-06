export type Device = {
  displayName: string;
  displaySettings?: boolean;
  make?: string;
  model: string;
};

export type Camera = Device & {
  lenses: Device[];
};

/**
 * Gallery photo tests will fail on cameras not defined here
 * displaySettings is off by default. Lens value overrides camera value.
 * Lenses that are not defined will be displayed as their EXIF LensModel value
 */
export const cameras: Camera[] = [
  {
    displayName: "Apple iPhone 14 Pro Max",
    displaySettings: false,
    make: "Apple",
    model: "iPhone 14 Pro Max",
    lenses: [
      {
        displayName: "Ultra Wide Camera",
        make: "Apple",
        model: "iPhone 14 Pro Max back triple camera 2.22mm f/2.2",
      },
      {
        displayName: "Main Camera",
        make: "Apple",
        model: "iPhone 14 Pro Max back triple camera 6.86mm f/1.78",
      },
      {
        displayName: "Telephoto Camera",
        make: "Apple",
        model: "iPhone 14 Pro Max back triple camera 9mm f/2.8",
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
    ],
  },
];