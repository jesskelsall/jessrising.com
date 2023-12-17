import { kebabCase, keyBy } from "lodash/fp";
import { locationHierarchy } from "../data/locations";
import { locationsDict } from "../data/locationsDict";
import {
  Location,
  LocationHierarchy,
  LocationTitle,
  LocationsDict,
} from "../types/location";
import { splitEmojiFromTitle } from "./emoji";

/**
 * Unpacks locationHierarchy into a flat object of locations
 * Separates location emojis from titles
 * Provides the title of the parent location if one exists (only countries shouldn't have one)
 */
export const computeLocations = (): LocationsDict => {
  const buildLocationsArray = (
    hierarchy: LocationHierarchy,
    parent?: LocationTitle
  ): Location[] => {
    const locationKeys = Object.keys(hierarchy);

    return locationKeys
      .map((key) => {
        const { emoji, title } = splitEmojiFromTitle(key);
        const locationTitle = LocationTitle.parse(title);

        return [
          { emoji, slug: kebabCase(title), title: locationTitle, parent },
          ...buildLocationsArray(hierarchy[key], locationTitle),
        ];
      })
      .flat(1);
  };

  const locationsArray = buildLocationsArray(locationHierarchy).sort();
  return keyBy("title", locationsArray);
};

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
