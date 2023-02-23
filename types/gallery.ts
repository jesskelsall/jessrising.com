import { ParsedUrlQuery } from "querystring";

export interface IEXIF {
  camera?: string;
  date?: string;
}

export type TQueryParam = string | string[];

export interface IGalleryQuery extends ParsedUrlQuery {
  page?: TQueryParam;
}
