import { ParsedUrlQuery } from "querystring";

export interface IEXIF {
  camera?: string;
  date?: string;
  dimensions?: {
    height: number;
    width: number;
  };
}

export type TQueryParam<T extends string = string> = T | T[];
export type TOrder = "newest" | "oldest";

export interface IGalleryQuery extends ParsedUrlQuery {
  location?: TQueryParam;
  month?: TQueryParam;
  order?: TQueryParam<TOrder>;
  page?: TQueryParam;
  tag?: TQueryParam;
  trip?: TQueryParam;
  year?: TQueryParam;
}

export interface INavigationButtonsText {
  first: string;
  previous: string;
  next: string;
  last: string;
}
