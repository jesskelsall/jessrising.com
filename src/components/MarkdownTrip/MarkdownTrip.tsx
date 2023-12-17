import { Trip } from "../../types/trip";
import { Pill } from "../Pill/Pill";

export const MarkdownTrip = ({ trip }: { trip: Trip }) => (
  <li>
    Trip:{" "}
    <Pill
      emoji={trip.icon}
      href={`/gallery?trip=${trip.slug}`}
      title={trip.title}
    />
  </li>
);
