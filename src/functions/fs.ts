/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import path from "path";
import util from "util";
import { DIR_CONTENT } from "../consts/app";
import { ContentType } from "../types/content";
import {
  GalleryPhoto,
  GalleryPhotoData,
  GalleryPhotoSlug,
} from "../types/galleryPhoto";
import { MarkdownString } from "../types/markdown";
import { IMarkdownData } from "../types/markdownOld";
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

// Removes the file extension from a file path
export const separateFileExtension = (fileName: string): [string, string] => {
  if (!fileName.includes(".")) return [fileName, ""];

  const fileParts = fileName.split(".");
  return [fileParts.slice(0, -1).join("."), fileParts.slice(-1)[0]];
};

// Collates a list of files into groups by slug, listing file extensions
export const groupFileNamesBySlug = (fileNames: string[]) =>
  fileNames.reduce<Record<string, string[]>>((acc, next) => {
    const [slug, fileType] = separateFileExtension(next);

    return {
      ...acc,
      [slug]: [...(acc[`${slug}`] || []), fileType].sort(),
    };
  }, {});

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
export const getAllGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  const fileNames = await getContentFileNames("photos");
  const slugGroups = groupFileNamesBySlug(fileNames);
  const slugs: [string, boolean][] = Object.entries(slugGroups)
    .filter(([_slug, fileTypes]) => fileTypes.includes("json"))
    .map(([slug, fileTypes]) => [slug, fileTypes.includes("md")]);

  const getGalleryPhotoData = async (slug: string, hasMarkdown: boolean) => {
    const photosDirectory = getContentDirectory("photos");
    const jsonBuffer = await readFile(
      path.join(photosDirectory, `${slug}.json`)
    );

    const galleryPhotoData = GalleryPhotoData.parse(
      JSON.parse(jsonBuffer.toString())
    ) as GalleryPhoto;
    galleryPhotoData.slug = GalleryPhotoSlug.parse(slug);

    if (hasMarkdown) {
      const markdownBuffer = await readFile(
        path.join(photosDirectory, `${slug}.md`)
      );
      galleryPhotoData.markdown = MarkdownString.parse(
        markdownBuffer.toString().trim()
      );
    }

    return galleryPhotoData;
  };

  return Promise.all<GalleryPhoto>(
    slugs.map(([slug, hasMarkdown]) => getGalleryPhotoData(slug, hasMarkdown))
  );
};
