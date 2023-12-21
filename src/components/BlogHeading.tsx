import { DateTime } from "luxon";
import { ReactNode } from "react";
import { useBlogPost } from "../context/blogPost";
import { formatDateRange } from "../functions/date";
import { zipBetween } from "../functions/jsx";

const lineBreak = <br />;

interface IBlogHeadingProps {
  children: React.ReactNode[];
  id?: string;
}

export const BlogHeading = ({ children, ...props }: IBlogHeadingProps) => {
  const { date } = useBlogPost();
  let heading: ReactNode[] = children;

  if (
    heading.length === 1 &&
    typeof heading[0] === "string" &&
    heading[0].includes(": ")
  ) {
    const headingParts = heading[0].split(": ");
    heading = zipBetween(headingParts, [":", lineBreak]);
  }

  return (
    <div>
      <h1 {...props}>{heading}</h1>
      {date && (
        <p>
          <em>{formatDateRange(DateTime.fromISO(date))}</em>
        </p>
      )}
    </div>
  );
};
