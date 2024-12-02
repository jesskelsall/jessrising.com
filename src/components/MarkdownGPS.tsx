import Link from "next/link";
import { IGPS } from "../types/markdownOld";
import { BlogListItem } from "./BlogList";

interface IMarkdownGPSProps {
  gps: IGPS;
}

export const MarkdownGPS = ({ gps }: IMarkdownGPSProps) => (
  <BlogListItem>
    <Link
      href={`https://google.com/maps/search/${gps.lat},${gps.long}`}
      target="_blank"
      rel="noopener"
    >
      GPS Location
    </Link>
  </BlogListItem>
);
