/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import { keyBy } from "lodash/fp";
import path from "path";
import util from "util";
import { DIR_DATA } from "../consts";
import { getAllBlogPosts, getAllGalleryPhotos } from "../functions/fs";
import { IMarkdownData, TMarkdownDataFile } from "../types";

const keyBySlug = keyBy<IMarkdownData>("slug");
const writeFile = util.promisify(fs.writeFile);

// Write a JSON data file that collates all data file entries
const writeData = async (
  data: TMarkdownDataFile,
  fileName: string
): Promise<void> => {
  await writeFile(path.resolve(DIR_DATA, fileName), JSON.stringify(data));
  console.info(fileName, Object.keys(data).length);
};

const preBuildBlogPosts = async (): Promise<void> => {
  const allBlogPosts = await getAllBlogPosts();
  const blogPostsData = keyBySlug(allBlogPosts);

  writeData(blogPostsData, "blogPosts.json");
};

const preBuildGalleryPhotos = async (): Promise<void> => {
  const allGalleryPhotos = await getAllGalleryPhotos();
  const galleryPhotosData = keyBySlug(allGalleryPhotos);

  writeData(galleryPhotosData, "galleryPhotos.json");
};

const prebuild = async (): Promise<void> => {
  await preBuildBlogPosts();
  await preBuildGalleryPhotos();
};

prebuild();
