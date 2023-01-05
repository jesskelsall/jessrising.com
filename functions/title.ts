import { apStyleTitleCase } from "ap-style-title-case";
import { startCase } from "lodash/fp";
import { APP_NAME, SEPARATOR } from "../consts";

export const titleCase = (title: string): string =>
  apStyleTitleCase(startCase(title));

// Apply the page's title to the website name
export const asPageTitle = (title?: string): string =>
  [title || null, APP_NAME].filter((file) => file).join(SEPARATOR);

// Convert a Next.js route URL into a page title
export const getRouteAsTitle = (route: string): string =>
  asPageTitle(titleCase([...route.split("/").slice(1)].pop() || ""));
