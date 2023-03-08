import _ from "lodash/fp";
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

// Expands a range parameter to each individual number value
export const expandRange = (param: TQueryParam): number[] => {
  const ranges = queryParamToStrings(param)
    .map((string) => string.split(","))
    .flat();

  const transform: (values: string[]) => number[] = _.flow(
    _.map((range) => {
      const rangeAsParts = range
        .split("-")
        .map((part) => Number.parseInt(part, 10));
      if (rangeAsParts.length > 2 || Number.isNaN(rangeAsParts[0])) {
        return undefined;
      }

      const isValidRange =
        rangeAsParts.length === 2 &&
        rangeAsParts.every((part) => !Number.isNaN(part));

      // Expand range into an array of values
      if (isValidRange) {
        const [start, end] = rangeAsParts;
        if (start === end) return start;

        const ascending = start < end;
        const [low, high] = ascending ? [start, end] : [end, start];

        const numbers = [...Array(high - low + 1).keys()].map(
          (num) => num + low
        );
        return ascending ? numbers : numbers.reverse();
      }

      // Return numbers as-is
      const rangeAsNumber = parseInt(range, 10);
      if (!Number.isNaN(rangeAsNumber)) return rangeAsNumber;

      // Disregard all other values
      return undefined;
    }),
    _.flatten,
    _.compact,
    _.uniq
  );

  return transform(ranges);
};
