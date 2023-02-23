import { ParsedUrlQuery } from "querystring";

export interface IEXIF {
  camera?: string;
  date?: string;
}

export type TQueryParam = string | string[];

export interface IGalleryQuery extends ParsedUrlQuery {
  location?: TQueryParam;
  month?: TQueryParam;
  page?: TQueryParam;
  tag?: TQueryParam;
  year?: TQueryParam;
}
