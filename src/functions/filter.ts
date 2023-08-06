// Formats a URL query parameter as a guaranteed array
export const formatFilterQuery = (
  queryParam: string | string[] | undefined
): string[] => {
  if (queryParam === undefined) return [];
  return typeof queryParam === "string" ? [queryParam] : queryParam;
};

export type TModelFilter<Model, Value = string | number | boolean> = [
  Value[], // Active filter values
  (model: Model) => Value[] // Function to retrieve values to filter by from the object
];

/**
 * Applies one or more filters to an array of generic objects
 * Each filter must be satisfied for an object to be displayed
 * @param objects Array of objects to be filtered
 * @param filters Array of tuple filters: valid filter values, function for getting values from the object
 * @returns Array of filtered objects
 */
export const applyFilterQueries = <Model>(
  objects: Model[],
  filters: TModelFilter<Model>[]
): Model[] =>
  objects.filter((object) =>
    filters.every(([requiredValues, valueAccessor]) => {
      // If the filter has no required values, all objects are valid
      if (!requiredValues.length) return true;

      const objectValues = valueAccessor(object);

      // All required values must be present on the object
      return requiredValues.every((requiredValue) =>
        objectValues.includes(requiredValue)
      );
    })
  );
