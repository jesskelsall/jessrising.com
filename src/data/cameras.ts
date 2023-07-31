export interface ILens {
  displayName: string;
  displaySettings?: boolean;
  model: string;
}

export interface ICamera {
  displayName: string;
  displaySettings?: boolean;
  make: string;
  model: string;
  lenses: ILens[];
}

/**
 * Gallery photo tests will fail on cameras not defined here
 * displaySettings is off by default. Lens value overrides camera value.
 * Lenses that are not defined will be displayed as their EXIF LensModel value
 */
export const cameras: ICamera[] = [
  {
    displayName: "iPhone 14 Pro Max",
    make: "Apple",
    model: "iPhone 14 Pro Max",
    lenses: [],
  },
  {
    displayName: "Sony ɑ550",
    displaySettings: true,
    make: "SONY",
    model: "DSLR-A550",
    lenses: [],
  },
  {
    displayName: "Sony ɑ7R V",
    displaySettings: true,
    make: "SONY",
    model: "ILCE-7RM5",
    lenses: [],
  },
];
