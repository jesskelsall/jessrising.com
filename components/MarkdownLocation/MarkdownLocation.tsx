import { kebabCase } from "lodash/fp";
import Link from "next/link";
import React from "react";
import { zipBetween } from "../../functions/jsx";

interface IMarkdownLocationProps {
  locations: string[][];
}

export const MarkdownLocation = ({ locations }: IMarkdownLocationProps) => {
  // Handle multiple locations on the same level
  const groupedLocations = locations.map((locationGroup) =>
    zipBetween(
      locationGroup.map((location) => {
        // Apply link markup
        const locationSlug = kebabCase(location);

        return (
          <Link key={locationSlug} href={`/gallery?location=${locationSlug}`}>
            {location}
          </Link>
        );
      }),
      " / "
    )
  );

  // Handle levels
  const locationsList = zipBetween(groupedLocations, ", ").flat();

  return <li>Location: {locationsList}</li>;
};
