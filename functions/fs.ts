/* eslint-disable security/detect-non-literal-fs-filename */

import ExifReader from "exifreader";
import fs from "fs";
import path from "path";
import util from "util";
import { DIR_CONTENT, DIR_PHOTOS } from "../consts";
import { ContentType, IBlogPost, IEXIF, IGalleryPhoto } from "../types";
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

// Read EXIF data from a photo file
export const readPhotoEXIF = async (filePath: string): Promise<IEXIF> => {
  const fileBuffer = await readFile(filePath);
  const { DateTime: Date, Make, Model } = await ExifReader.load(fileBuffer);

  // Apply EXIF tag data if present
  const exifData: IEXIF = {};

  if (Date?.value[0]) {
    exifData.date = `${Date.value[0]}`;
  }

  if (Make?.value[0] && Model?.value[0]) {
    exifData.camera = `${Make.value[0]} ${Model.value[0]}`;
  }

  return exifData;
};

// Get all gallery photos in the photos directory
export const getAllGalleryPhotos = async (): Promise<IGalleryPhoto[]> => {
  const fileNames = await getContentFileNames("photos");
  const slugs = getSlugsFromMarkdownFiles(fileNames);

  return Promise.all<IGalleryPhoto>(
    slugs.map(
      (slug) =>
        new Promise((resolve) => {
          const contentPath = path.join(
            getContentDirectory("photos"),
            `${slug}.md`
          );
          const photoPath = path.resolve(DIR_PHOTOS, `${slug}.jpeg`);

          // Content markdown file → markdown
          readFile(contentPath).then((contentBuffer) => {
            // Photo file → EXIF tag values
            readPhotoEXIF(photoPath).then((exif) => {
              resolve({
                markdown: contentBuffer.toString(),
                metaData: exif,
                slug,
              });
            });
          });
        })
    )
  );
};
