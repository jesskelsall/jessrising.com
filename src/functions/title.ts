import { titleCase as tc } from "title-case";
import { lowerCase } from "lodash/fp";
import { APP_NAME } from "../consts/app";
import { SEPARATOR } from "../consts/text";

export const titleCase = (title: string): string => tc(lowerCase(title));

// Apply the page's title to the website name
export const asPageTitle = (title?: string): string =>
  [title || null, APP_NAME].filter((file) => file).join(SEPARATOR);

// Convert a Next.js route URL into a page title
export const getRouteAsTitle = (route: string): string =>
  asPageTitle(titleCase([...route.split("/").slice(1)].pop() || ""));

// Display a word as a singular or plural depending on quantity
export const pluralise = (
  singular: string,
  plural: string,
  quantity: number
): string => (quantity === 1 ? singular : plural);
