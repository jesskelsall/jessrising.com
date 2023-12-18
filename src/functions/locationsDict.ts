import { locationsDict } from "../data/locationsDict";
import { Location, LocationTitle } from "../types/location";

// Returns a location's hierarchy, from most to least specific related location
export const getLocationHierarchy = (
  location: LocationTitle | null
): Location[] => {
  if (!location) return [];

  const locations: Location[] = [];
  let currentLocationTitle: LocationTitle | undefined = location;

  while (currentLocationTitle) {
    const currentLocation: Location = locationsDict[currentLocationTitle];
    if (!currentLocation) break;

    locations.push(currentLocation);
    currentLocationTitle = currentLocation.parent;
  }

  return locations;
};
