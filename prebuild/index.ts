/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import util from "util";
import path from "path";
import { getAllBlogPosts } from "../functions/fs";
import { TMarkdownDataFile } from "../types";
import { DIR_DATA } from "../consts";

const writeFile = util.promisify(fs.writeFile);

/**
 * TODO
 * Load all data up-front so that the rest of the build process is swift
 * Also means each page can be statically generated as HTML
 *
 * gallery photos
 * blog posts
 *
 * write each category to a big JSON file which can be loaded when needed
 * object keyed by slug
 */

const preBuildBlogPosts = async (): Promise<void> => {
  const allBlogPosts = await getAllBlogPosts();
  const blogPostsData: TMarkdownDataFile = allBlogPosts.reduce(
    (collection, blogPost) => ({ ...collection, [blogPost.slug]: blogPost }),
    {}
  );

  await writeFile(
    path.resolve(DIR_DATA, "blogPosts.json"),
    JSON.stringify(blogPostsData)
  );
  console.info("blogPosts.json", allBlogPosts.length);
};

preBuildBlogPosts();
