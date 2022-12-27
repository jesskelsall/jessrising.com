import { apStyleTitleCase } from "ap-style-title-case";
import _, { min } from "lodash";
import { APP_NAME, SEPARATOR } from "../consts";

export const titleCase = (title: string): string =>
  apStyleTitleCase(_.startCase(title));

// Apply the page's title to the website name
export const asPageTitle = (title?: string): string =>
  [title || null, APP_NAME].filter((file) => file).join(SEPARATOR);

// Convert a Next.js route URL into a page title
export const getRouteAsTitle = (route: string): string =>
  asPageTitle([...route.split("/").slice(1)].pop());

// Convert a blog post's first line into a page title
export const getBlogPostTitle = (markdown: string): string =>
  markdown.split("\n")[0].replace("# ", "");
