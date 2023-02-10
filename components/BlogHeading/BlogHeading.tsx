import { DateTime } from "luxon";
import { ReactNode } from "react";
import { useBlogPost } from "../../context";
import { formatLongDate } from "../../functions";

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
    heading = [`${headingParts[0]}:`, <br key="break" />, headingParts[1]];
  }

  return (
    <div>
      <h1 {...props}>{heading}</h1>
      {date && (
        <p>
          <em>{formatLongDate(DateTime.fromISO(date))}</em>
        </p>
      )}
    </div>
  );
};
