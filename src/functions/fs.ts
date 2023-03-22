/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import path from "path";
import util from "util";
import { DIR_CONTENT } from "../consts/app";
import { ContentType } from "../types/content";
import { IMarkdownData } from "../types/markdown";
import { getSlugsFromMarkdownFileNames } from "./file";
import { parseMarkdown } from "./markdown";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

// Gets the path to the directory containing the given type of content
export const getContentDirectory = (contentType: ContentType): string =>
  path.resolve(DIR_CONTENT, contentType);

// Gets all file names for the given type of content
export const getContentFileNames = async (
  contentType: ContentType
): Promise<string[]> => readdir(getContentDirectory(contentType));

// Gets all blog posts in the blog directory
export const getAllBlogPosts = async (): Promise<IMarkdownData[]> => {
  const fileNames = await getContentFileNames("blog");
  const slugs = getSlugsFromMarkdownFileNames(fileNames);

  return Promise.all<IMarkdownData>(
    slugs.map(
      (slug) =>
        new Promise((resolve) => {
          const filePath = path.join(getContentDirectory("blog"), `${slug}.md`);
          readFile(filePath).then((buffer) =>
            resolve(parseMarkdown(slug, buffer.toString()))
          );
        })
    )
  );
};

// Get all gallery photos in the photos directory
export const getAllGalleryPhotos = async (): Promise<IMarkdownData[]> => {
  const fileNames = await getContentFileNames("photos");
  const slugs = getSlugsFromMarkdownFileNames(fileNames);

  const getGalleryPhoto = async (slug: string) => {
    const contentPath = path.join(getContentDirectory("photos"), `${slug}.md`);
    const contentBuffer = await readFile(contentPath);
    return parseMarkdown(slug, contentBuffer.toString());
  };

  return Promise.all<IMarkdownData>(slugs.map(getGalleryPhoto));
};
