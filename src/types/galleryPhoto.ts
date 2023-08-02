export type GalleryPhotoMetaCategory =
  | "Camera"
  | "Date"
  | "Dimensions"
  | "EXIF"
  | "GPS"
  | "Location"
  | "Tags";

export type EXIF = {
  camera?: {
    name: string;
    lens?: string;
    settings?: {
      exposureBias?: number;
      exposureTime?: number;
      focalLength?: number;
      fStop?: number;
      ISO?: number;
    };
  };
  date?: string;
  dimensions?: {
    height: number;
    width: number;
  };
};

export type GalleryPhoto = {
  slug: string;
  title: string;
  exif: EXIF;
  markdown?: string;
  meta: {
    gps?: {
      lat: number;
      long: number;
    };
    location?: string[];
    tags?: string[];
  };
};

export type GalleryPhotos = Record<string, GalleryPhoto>;
