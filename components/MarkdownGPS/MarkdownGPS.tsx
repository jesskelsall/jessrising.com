import Link from "next/link";
import { IGPS } from "../../types";

interface IMarkdownGPSProps {
  gps: IGPS;
}

export const MarkdownGPS = ({ gps }: IMarkdownGPSProps) => (
  <li>
    <Link href={`https://google.com/maps/search/${gps.lat},${gps.long}`}>
      GPS Location
    </Link>
  </li>
);
