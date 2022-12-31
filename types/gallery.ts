export interface IEXIF {
  camera?: string;
  date?: string;
}

export interface IGPS {
  lat: number;
  long: number;
}

export interface IGalleryPhoto {
  markdown: string;
  metaData: IEXIF & {
    gps?: IGPS;
    tags?: string[];
  };
  slug: string;
}
