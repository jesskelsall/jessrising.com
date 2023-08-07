import Link from "next/link";
import { Trip } from "../../types/trip";

export const MarkdownTrip = ({ trip }: { trip: Trip }) => (
  <li>
    Trip: <Link href={`/gallery?trip=${trip.slug}`}>{trip.title}</Link>
  </li>
);
