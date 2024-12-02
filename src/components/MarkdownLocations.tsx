import { getLocationHierarchy } from "@/functions/locationsDict";
import { LocationTitle } from "../types/location";
import { PillRow } from "./PillRow";

export const MarkdownLocations = ({
  location,
}: {
  location: LocationTitle;
}) => {
  const locations = getLocationHierarchy(location);
  const pills = locations.map(({ emoji, slug, title }) => ({
    emoji,
    href: `/gallery?location=${slug}`,
    title,
  }));

  return <PillRow pills={pills} />;
};
