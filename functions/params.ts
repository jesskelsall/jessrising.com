import { TQueryParam } from "../types/gallery";

// Ensures a consistent array of strings for a given query parameter
export const queryParamToStrings = (
  param: TQueryParam | undefined
): string[] => {
  if (!param) return [];
  if (typeof param === "string") return [param];
  return param;
};

// Same as queryParamToStrings but casts to integers and removes invalid values
export const queryParamToIntegers = (
  param: TQueryParam | undefined
): number[] => {
  const strings = queryParamToStrings(param);
  return strings
    .map((string) => Number.parseInt(string, 10))
    .filter((number) => !Number.isNaN(number));
};
