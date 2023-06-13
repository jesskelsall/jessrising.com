import { ILocationHierarchy, locationHierarchy } from "../data/locations";

// Recursively builds a path from the desired location to the top most location level
const findLocations = (
  locationToFind: string,
  locationsSoFar: string[],
  hierarchy: ILocationHierarchy
): string[] | undefined => {
  if (Object.keys(hierarchy).length === 0) return undefined;

  const results = Object.keys(hierarchy).map((location) => {
    const updatedLocationsSoFar = [location, ...locationsSoFar];

    return location === locationToFind
      ? updatedLocationsSoFar
      : findLocations(
          locationToFind,
          updatedLocationsSoFar,
          hierarchy[`${location}`]
        );
  });

  return results.find((result) => result !== undefined);
};

export const getLocationHierarchy = (location: string): string[] => {
  if (!location) return [];

  const locations = findLocations(location, [], locationHierarchy);
  return locations || [location];
};
