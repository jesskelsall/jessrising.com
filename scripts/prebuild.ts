/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import { keyBy } from "lodash/fp";
import path from "path";
import util from "util";
import { DIR_DATA } from "../src/consts/app";
import { getAllBlogPosts, getAllContent } from "../src/functions/fs";
import {
  GalleryPhoto,
  GalleryPhotoData,
  GalleryPhotoSlug,
} from "../src/types/galleryPhoto";
import { IMarkdownData } from "../src/types/markdownOld";
import { Trip, TripData, TripSlug } from "../src/types/trip";

const writeFile = util.promisify(fs.writeFile);

// Write a JSON data file that collates all data file entries
const writeData = async <Data extends object>(
  data: Data,
  fileName: string
): Promise<void> => {
  await writeFile(path.resolve(DIR_DATA, fileName), JSON.stringify(data));
  console.info(fileName, Object.keys(data).length);
};

// Read and collate all blog post markdown files
const preBuildBlogPosts = async (): Promise<void> => {
  const allBlogPosts = await getAllBlogPosts();
  const blogPostsData = keyBy<IMarkdownData>("slug", allBlogPosts);

  writeData<Record<string, IMarkdownData>>(blogPostsData, "blogPosts.json");
};

// Read and collate all photo JSON/markdown file pairs
const preBuildGalleryPhotos = async (): Promise<void> => {
  const galleryPhotos = await getAllContent<GalleryPhoto>(
    "photos",
    GalleryPhotoData,
    GalleryPhotoSlug
  );

  writeData<GalleryPhoto[]>(galleryPhotos, "galleryPhotos.json");
};

const preBuildTrips = async (): Promise<void> => {
  const trips = await getAllContent<Trip>("trips", TripData, TripSlug);

  writeData<Trip[]>(trips, "trips.json");
};

const prebuild = async (): Promise<void> => {
  await preBuildBlogPosts();
  await preBuildGalleryPhotos();
  await preBuildTrips();
};

prebuild();
