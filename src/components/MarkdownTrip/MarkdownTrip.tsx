import Link from "next/link";
import { Trip } from "../../types/trip";

export const MarkdownTrip = ({ trip }: { trip: Trip }) => (
  <li>
    Trip: {trip.icon && <span className="emoji">{trip.icon}&nbsp;</span>}
    <Link href={`/gallery?trip=${trip.slug}`}>{trip.title}</Link>
  </li>
);
