import Link from "next/link";
import { IGPS } from "../../types/markdownOld";

interface IMarkdownGPSProps {
  gps: IGPS;
}

export const MarkdownGPS = ({ gps }: IMarkdownGPSProps) => (
  <li>
    <Link
      href={`https://google.com/maps/search/${gps.lat},${gps.long}`}
      target="_blank"
      rel="noopener"
    >
      GPS Location
    </Link>
  </li>
);
