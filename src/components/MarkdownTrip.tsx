import { Trip } from "../types/trip";
import { BlogListItem } from "./BlogList";
import { Pill } from "./Pill";

export const MarkdownTrip = ({ trip }: { trip: Trip }) => (
  <BlogListItem>
    Trip:{" "}
    <Pill
      emoji={trip.emoji}
      href={`/gallery?trip=${trip.slug}`}
      title={trip.title}
    />
  </BlogListItem>
);
