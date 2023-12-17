import { Location } from "../../types/location";
import { PillRow } from "../PillRow/PillRow";

type MarkdownLocationsProps = {
  locations: Location[];
};

export const MarkdownLocations = ({ locations }: MarkdownLocationsProps) => {
  const pills = locations.map(({ emoji, slug, title }) => ({
    emoji,
    href: `/gallery?location=${slug}`,
    title,
  }));

  return (
    <li>
      Location: <PillRow pills={pills} />
    </li>
  );
};
