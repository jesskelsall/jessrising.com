/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import { keyBy } from "lodash/fp";
import path from "path";
import util from "util";
import { DIR_DATA } from "../src/consts/app";
import { getAllBlogPosts, getAllGalleryPhotos } from "../src/functions/fs";
import { IMarkdownData } from "../src/types/markdown";
import { GalleryPhoto } from "../src/types/galleryPhoto";

const writeFile = util.promisify(fs.writeFile);

// Write a JSON data file that collates all data file entries
const writeData = async <Data extends object>(
  data: Record<string, Data>,
  fileName: string
): Promise<void> => {
  await writeFile(path.resolve(DIR_DATA, fileName), JSON.stringify(data));
  console.info(fileName, Object.keys(data).length);
};

const preBuildBlogPosts = async (): Promise<void> => {
  const allBlogPosts = await getAllBlogPosts();
  const blogPostsData = keyBy<IMarkdownData>("slug", allBlogPosts);

  writeData<IMarkdownData>(blogPostsData, "blogPosts.json");
};

const preBuildGalleryPhotos = async (): Promise<void> => {
  const allGalleryPhotos = await getAllGalleryPhotos();
  const galleryPhotosData = keyBy<GalleryPhoto>("slug", allGalleryPhotos);

  writeData<GalleryPhoto>(galleryPhotosData, "galleryPhotos.json");
};

const prebuild = async (): Promise<void> => {
  await preBuildBlogPosts();
  await preBuildGalleryPhotos();
};

prebuild();
