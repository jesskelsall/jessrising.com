import { kebabCase } from "lodash/fp";
import Link from "next/link";
import React from "react";

interface IMarkdownLocationProps {
  locations: string[];
}

export const MarkdownLocation = ({ locations }: IMarkdownLocationProps) => (
  <li>
    Location:{" "}
    {locations.map((location, index) => {
      const locationSlug = kebabCase(location);

      return (
        <React.Fragment key={locationSlug}>
          {index !== 0 && ", "}
          <Link href={`/gallery/l/${locationSlug}`}>{location}</Link>
        </React.Fragment>
      );
    })}
  </li>
);
