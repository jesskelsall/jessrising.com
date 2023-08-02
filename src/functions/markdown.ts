import { cloneDeep } from "lodash/fp";
import { MARKDOWN_DATA_EMPTY } from "../consts/data";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import {
  IMarkdownData,
  IMarkdownMetaData,
  TMarkdownListData,
} from "../types/markdownOld";
import { dateFromSlug } from "./date";
import { getLocationHierarchy } from "./location";

const LIST_LINE_PREFIX = "- ";

const emptyMetaData = (): IMarkdownMetaData =>
  cloneDeep(MARKDOWN_DATA_EMPTY.meta);

// eslint-disable-next-line security/detect-non-literal-regexp
const suffixesRegExp = new RegExp(
  `(${Object.values(PHOTO_SIZE_SUFFIX).join("|")})$`
);

// Get the photo file name from a markdown file's img src attribute
export const parsePhotoSlugFromSrc = (src: string): string =>
  src.split("/").reverse()[0].replace(".jpeg", "").replace(suffixesRegExp, "");

// Get the first heading from a list of markdown lines
export const parseMarkdownFirstHeading = (
  markdownLines: string[]
): string | undefined => {
  const firstTitle = markdownLines.find((line) => line.startsWith("#"));

  if (!firstTitle) return undefined;
  return firstTitle.replace(/^#+ /, "");
};

/**
 * Get the "cover" image slug from a markdown file
 * The first img tag with a "cover" attribute, or first image
 */
export const parseMarkdownCoverImageSlug = (
  markdownLines: string[]
): string | undefined => {
  // Get image tags
  const imageLines = markdownLines.filter((line) => line.startsWith("<img"));
  if (!imageLines.length) return undefined;

  // Get image tag
  const coverImage = imageLines.find((line) => line.endsWith(" cover />"));
  const imageLine = coverImage || imageLines[0];

  // Get URL from src
  const srcMatch = imageLine.match(/src="([^"]+)"/);
  if (!srcMatch) return undefined;

  return parsePhotoSlugFromSrc(srcMatch[1]);
};

// Get the first paragraph from a list of markdown lines
export const parseMarkdownFirstParagraph = (
  markdownLines: string[]
): string | undefined =>
  markdownLines.filter(
    (line) =>
      line.trim() && // Isn't an empty line
      !line.startsWith("#") && // Isn't a heading
      !line.startsWith("<") && // Isn't a HTML tag
      !line.startsWith("-") && // Isn't an unordered list
      !/^\d+\. /.test(line) // Isn't an ordered list
  )[0];

export const lineIsUnorderedListItem = (line: string): boolean =>
  line.startsWith(LIST_LINE_PREFIX);

// Parse markdown data from specially formatted unordered list
export const parseMarkdownListData = <K extends string = string>(
  markdownLines: string[]
): TMarkdownListData<K> => {
  const listLines = markdownLines
    .filter(lineIsUnorderedListItem)
    .map((line) => line.replace(LIST_LINE_PREFIX, ""));

  return listLines.reduce<TMarkdownListData<K>>((data, line) => {
    if (!line.includes(":")) return data;

    const [category, ...contentParts] = line
      .split(":")
      .map((part) => part.trim());
    const isJSONValue = contentParts[0]?.startsWith("`");
    const values = contentParts
      .join(":")
      .split(isJSONValue ? /^/ : ",")
      .map((value) => value.trim())
      .filter((value) => value);

    const updatedData: TMarkdownListData<K> = { ...data };
    updatedData[category as K] = [
      ...(updatedData[category as K] || []),
      ...values,
    ];

    return updatedData;
  }, {});
};

/**
 * Parse markdown data from a specially formatted unordered list
 * The list is removed from the list of markdown lines returned
 */
export const parseMarkdownMeta = (
  markdownLines: string[]
): [IMarkdownMetaData, string[]] => {
  // Get the start of the list
  const firstIndex = markdownLines.findIndex(lineIsUnorderedListItem);
  if (firstIndex === -1) return [emptyMetaData(), markdownLines];

  // Get the end of the list
  const lastIndex = markdownLines
    .slice(firstIndex)
    .findIndex((line) => !lineIsUnorderedListItem(line));

  // Splice list lines from markdown lines
  const editedMarkdownLines = [...markdownLines];
  const listLines =
    lastIndex === -1
      ? editedMarkdownLines.splice(firstIndex)
      : editedMarkdownLines.splice(firstIndex, lastIndex);

  // Get metadata from list lines
  const listData = parseMarkdownListData(listLines);

  // Convert to valid meta attributes
  const meta: IMarkdownMetaData = emptyMetaData();

  if (listData.Camera) {
    meta.photo.camera = `${listData.Camera[0]}`;
  }

  if (listData.Date) {
    meta.photo.date = `${listData.Date[0]}`;
  }

  if (listData.Dimensions) {
    const [width, height] = listData.Dimensions[0]
      .split("x")
      .map((dimension) => parseInt(dimension, 10));
    if (!Number.isNaN(width) && !Number.isNaN(height)) {
      meta.photo.dimensions = { height, width };
    }
  }

  if (listData.GPS) {
    const [lat, long] = listData.GPS.map((value) => parseFloat(value));
    meta.gps = { lat, long };
  }

  if (listData.Location) {
    meta.locations = getLocationHierarchy(listData.Location[0]);
  }

  if (listData.Tags) {
    meta.tags = listData.Tags;
  }

  return [meta, editedMarkdownLines];
};

// Parses a markdown file as text to extract all of its metadata before rendering
export const parseMarkdown = (
  slug: string,
  markdownFile: string
): IMarkdownData => {
  const markdownLines = markdownFile.trim().split("\n");
  const [meta, markdownLinesWithoutMeta] = parseMarkdownMeta(markdownLines);

  const markdownData: IMarkdownData = {
    markdown: markdownLinesWithoutMeta.join("\n"),
    meta,
    slug,
    summary: {},
  };

  // Optional properties
  const date = dateFromSlug(slug);
  const summaryHeading = parseMarkdownFirstHeading(markdownLines);
  const summaryImageSlug = parseMarkdownCoverImageSlug(markdownLines);
  const summaryParagraph = parseMarkdownFirstParagraph(markdownLines);

  if (date) markdownData.date = date.toISODate();
  if (summaryHeading) markdownData.summary.heading = summaryHeading;
  if (summaryImageSlug) markdownData.summary.imageSlug = summaryImageSlug;
  if (summaryParagraph) markdownData.summary.paragraph = summaryParagraph;

  return markdownData;
};

// TODO new below vvv

// Tests if a markdown line can be considered content when evaluating metadata lists
export const lineIsContentLine = (line: string): boolean =>
  line.trim().length !== 0 && !line.startsWith("# ");

// Separates markdown metadata lines from all other lines
// Metadata lines are the first list below the main heading
export const extractMarkdownMetaLines = (
  markdownLines: string[]
): {
  metaLines: string[];
  otherLines: string[];
} => {
  // Get the start of the content
  const firstContentIndex = markdownLines.findIndex(lineIsContentLine);

  // Get the start of the list
  const firstIndex = markdownLines.findIndex(lineIsUnorderedListItem);

  // List must exist
  // List must be first content
  if (firstIndex === -1 || firstIndex !== firstContentIndex) {
    return { metaLines: [], otherLines: markdownLines };
  }

  // Get the end of the list
  const lastIndex = markdownLines
    .slice(firstIndex)
    .findIndex((line) => !lineIsUnorderedListItem(line));

  // Splice list lines from markdown lines
  const otherLines = [...markdownLines];
  const metaLines =
    lastIndex === -1
      ? otherLines.splice(firstIndex)
      : otherLines.splice(firstIndex, lastIndex);

  return { metaLines, otherLines };
};
