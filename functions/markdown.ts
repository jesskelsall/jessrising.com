import { IMarkdownData, IMarkdownMetaData } from "../types/markdown";
import { dateFromSlug } from "./date";

// Get the photo file name from a markdown file's img src attribute
export const parsePhotoSlugFromSrc = (src: string): string =>
  src.split("/").reverse()[0].replace(".jpeg", "");

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
  line.startsWith("- ");

/**
 * Parse markdown data from a specially formatted unordered list
 * The list is removed from the list of markdown lines returned
 */
export const parseMarkdownMeta = (
  markdownLines: string[]
): [IMarkdownMetaData, string[]] => {
  // Get the start of the list
  const firstIndex = markdownLines.findIndex(lineIsUnorderedListItem);
  if (firstIndex === -1) return [{}, markdownLines];

  // Get the end of the list
  const lastIndex = markdownLines
    .slice(firstIndex)
    .findIndex((line) => !lineIsUnorderedListItem(line));

  // Splice list lines from markdown lines
  const editedMarkdownLines = [...markdownLines];
  const listLines = (
    lastIndex === -1
      ? editedMarkdownLines.splice(firstIndex)
      : editedMarkdownLines.splice(firstIndex, lastIndex)
  ).map((line) => line.replace(/^- /, ""));

  // Check list is key/value pairs (meta)
  const isMetaList = listLines.every((line) => /^\w+: .{1,}$/.test(line));
  if (!isMetaList) return [{}, markdownLines];

  // Parse key/value pairs
  const metaEntries = listLines.map((line) => line.split(": "));

  // Convert to valid meta attributes
  const meta: IMarkdownMetaData = {};

  metaEntries.forEach((entry) => {
    switch (entry[0]) {
      case "GPS":
        {
          const [lat, long] = entry[1]
            .split(",")
            .map((value) => parseFloat(value));
          meta.gps = { lat, long };
        }
        break;
      case "Location":
        meta.locations = entry[1]
          .split(", ")
          .map((locationGroup) => locationGroup.split(" / "));
        break;
      case "Tags":
        meta.tags = entry[1].split(",");
        break;
      default:
        console.warn(`Unexpected markdown meta tag "${entry[0]}".`);
    }
  });

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
