import { locationHierarchy } from "../data/locations";
import { LocationHierarchy } from "../types/location";

// Recursively builds a path from the desired location to the top most location level
const findLocations = (
  locationToFind: string,
  locationsSoFar: string[],
  hierarchy: LocationHierarchy
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

// Returns an array of locations, from the location specified, to least specific parent
export const getLocationHierarchy = (location: string): string[] => {
  if (!location) return [];

  const locations = findLocations(location, [], locationHierarchy);
  return locations || [location];
};
