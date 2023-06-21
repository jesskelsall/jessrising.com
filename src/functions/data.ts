import { IMarkdownData, TMarkdownDataFile } from "../types/markdown";

// Return the markdown data file at the given slug key
export const getMarkdownDataBySlug = (
  dataSet: TMarkdownDataFile,
  slug: string
): IMarkdownData | undefined => dataSet[`${slug}`];

// Return the markdown data file with the given slug key
export const findMarkdownDataBySlug = (
  dataSet: IMarkdownData[],
  slug: string
): IMarkdownData | undefined => dataSet.find((data) => data.slug === slug);

// Return a lighter version of all markdown data files for use on other pages
export const getOtherMarkdownData = (
  data: TMarkdownDataFile
): IMarkdownData[] =>
  Object.values(data).map((dataFile) => ({ ...dataFile, markdown: "" }));
