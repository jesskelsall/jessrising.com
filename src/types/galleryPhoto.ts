export type TGalleryPhotoMetaCategory =
  | "Camera"
  | "Date"
  | "Dimensions"
  | "GPS"
  | "Location"
  | "Tags";

export interface IEXIF {
  camera?: string;
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
