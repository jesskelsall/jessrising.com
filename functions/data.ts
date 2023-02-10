import { IMarkdownData, TMarkdownDataFile } from "../types";

// Return the markdown data file at the given slug key
export const getMarkdownDataBySlug = (
  data: TMarkdownDataFile,
  slug: string
): IMarkdownData | undefined => data[`${slug}`];

// Return a lighter version of all markdown data files for use on other pages
export const getOtherMarkdownData = (
  data: TMarkdownDataFile
): IMarkdownData[] =>
  Object.values(data).map((dataFile) => ({ ...dataFile, markdown: "" }));
