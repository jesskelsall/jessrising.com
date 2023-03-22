import { ParsedUrlQuery } from "querystring";

export interface IEXIF {
  camera?: string;
  date?: string;
  dimensions?: {
    height: number;
    width: number;
  };
}

export type TQueryParam = string | string[];

export interface IGalleryQuery extends ParsedUrlQuery {
  location?: TQueryParam;
  month?: TQueryParam;
  page?: TQueryParam;
  tag?: TQueryParam;
  year?: TQueryParam;
}
