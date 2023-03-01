import { MARKDOWN_FILETYPE } from "../consts/app";

export const getSlugsFromMarkdownFiles = (files: string[]): string[] =>
  files
    .filter((file) => file.endsWith(MARKDOWN_FILETYPE))
    .map((file) => file.slice(0, -MARKDOWN_FILETYPE.length))
    .sort();
