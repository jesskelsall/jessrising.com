import { kebabCase } from "lodash/fp";
import Link from "next/link";
import React from "react";
import { LocationFlags } from "../../data/locations";
import { zipBetween } from "../../functions/jsx";

interface IMarkdownLocationsProps {
  locations: string[];
}

export const MarkdownLocations = ({ locations }: IMarkdownLocationsProps) => {
  // Apply link markup
  const locationLinks = locations.map((eachLocation) => {
    const locationSlug = kebabCase(eachLocation);
    const locationFlag: string | undefined = LocationFlags[eachLocation];

    return (
      <React.Fragment key={locationSlug}>
        {locationFlag && <span className="emoji">{locationFlag}&nbsp;</span>}
        <Link href={`/gallery?location=${locationSlug}`}>{eachLocation}</Link>
      </React.Fragment>
    );
  });

  // Handle levels
  const locationsList = zipBetween(locationLinks, ", ").flat();

  return <li>Location: {locationsList}</li>;
};
