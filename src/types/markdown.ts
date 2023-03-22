import { IEXIF } from "./gallery";

// GPS coordinate
export interface IGPS {
  lat: number;
  long: number;
}

export interface IMarkdownMetaData {
  gps?: IGPS;
  locations?: string[][];
  photo?: IEXIF;
  tags?: string[];
}

// Parsed markdown file with all metadata extracted
export interface IMarkdownData {
  date?: string;
  markdown: string;
  meta: IMarkdownMetaData;
  slug: string;
  summary: {
    heading?: string;
    imageSlug?: string;
    paragraph?: string;
  };
}

export type TMarkdownDataFile = Record<string, IMarkdownData>;

interface IListRendererProps {
  children: JSX.Element[];
}

// Function for rendering an ordered/unordered list's items
export type TListRenderer = (props: IListRendererProps) => JSX.Element | null;
