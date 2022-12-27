/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import path from "path";
import util from "util";
import { DIR_CONTENT } from "../consts";
import { ContentType, IBlogPost } from "../types";
import { getSlugsFromMarkdownFiles } from "./file";

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
export const getAllBlogPosts = async (): Promise<IBlogPost[]> => {
  const fileNames = await getContentFileNames("blog");
  const slugs = getSlugsFromMarkdownFiles(fileNames);

  return Promise.all<IBlogPost>(
    slugs.map(
      (slug) =>
        new Promise((resolve) => {
          const filePath = path.join(getContentDirectory("blog"), `${slug}.md`);
          readFile(filePath).then((buffer) =>
            resolve({
              markdown: buffer.toString(),
              slug,
            })
          );
        })
    )
  );
};
