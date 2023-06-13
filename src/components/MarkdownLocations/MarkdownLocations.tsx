import { kebabCase } from "lodash/fp";
import Link from "next/link";
import { zipBetween } from "../../functions/jsx";

interface IMarkdownLocationsProps {
  locations: string[];
}

export const MarkdownLocations = ({ locations }: IMarkdownLocationsProps) => {
  const locationLinks = locations.map((eachLocation) => {
    // Apply link markup
    const locationSlug = kebabCase(eachLocation);

    return (
      <Link key={locationSlug} href={`/gallery?location=${locationSlug}`}>
        {eachLocation}
      </Link>
    );
  });

  // Handle levels
  const locationsList = zipBetween(locationLinks, ", ").flat();

  return <li>Location: {locationsList}</li>;
};
