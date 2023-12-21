import { lowerCase } from "lodash/fp";
import { titleCase as tc } from "title-case";
import { APP_NAME } from "../consts/app";
import { SEPARATOR } from "../consts/text";

/**
 * Converts text to a properly cased title.
 * @param text String to turn into a title.
 * @returns Title cased text.
 */
export const titleCase = (text: string): string => tc(lowerCase(text));

/**
 * Display the page title alongside the website name.
 * @param title Page title.
 * @returns Title to be displayed in a <title> tag.
 */
export const asPageTitle = (title?: string): string =>
  [title || null, APP_NAME].filter((file) => file).join(SEPARATOR);

/**
 * Convert a Next.js route URL into a page title.
 * @param route Next.js route URL.
 * @returns Title to be displayed in a <title> tag.
 */
export const getRouteAsTitle = (route: string): string =>
  asPageTitle(titleCase([...route.split("/").slice(1)].pop() || ""));

/**
 * Display a word as singular or plural depending on quantity.
 * @param singular Singular form of the word.
 * @param plural Plural form of the word.
 * @param quantity Quantity relating to the word.
 * @returns Singular or plural form of the word.
 */
export const pluralise = (
  singular: string,
  plural: string,
  quantity: number
): string => (quantity === 1 ? singular : plural);
