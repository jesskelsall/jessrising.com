// Get the first heading from a markdown file
export const getMarkdownTitle = (markdown: string): string => {
  const lines = markdown.split("\n");
  const firstTitle = lines.find((line) => line.startsWith("#"));

  if (!firstTitle) return "";
  return firstTitle.replace(/^#+ /, "");
};

// Get the photo file name from a markdown file's img src attribute
export const photoSlugFromSrc = (src: string): string =>
  src.split("/").reverse()[0].replace(".jpeg", "");

//
export const getMarkdownFirstImageSlug = (markdown: string): string | null => {
  // Get image tag
  const images = markdown.split("\n").filter((line) => line.startsWith("<img"));
  if (!images.length) return null;

  // Get URL from src
  const match = images[0].match(/src="([^"]+)"/);
  if (!match) return null;

  return photoSlugFromSrc(match[1]);
};

// Get the first textual line from a markdown file
export const getMarkdownFirstParagraph = (markdown: string): string => {
  const lines = markdown.split("\n");
  const validLines = lines.filter(
    (line) =>
      line &&
      !line.startsWith("#") &&
      !line.startsWith("<") &&
      !line.startsWith("-") &&
      !/^\d+\. /.test(line)
  );

  return validLines[0] || "";
};
