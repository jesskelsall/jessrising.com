import { locationDictionary } from "../data/locations";

export const getLocationHierarchy = (location: string): string[] => {
  if (!location) return [];

  let lastLocation = location;
  const locations: string[] = [];

  do {
    locations.push(lastLocation);
    lastLocation = locationDictionary[`${lastLocation}`];
  } while (lastLocation);

  return locations;
};
