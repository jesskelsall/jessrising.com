export type TGalleryPhotoMetaCategory =
  | "Camera"
  | "Date"
  | "Dimensions"
  | "GPS"
  | "Location"
  | "Tags";

export interface IEXIF {
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
}

export interface IGalleryPhoto {
  slug: string;
  title: string;
  exif: IEXIF;
  markdown?: string;
  meta: {
    gps?: {
      lat: number;
      long: number;
    };
    location?: string[];
    tags?: string[];
  };
}
