import { ReactNode } from "react";
import { SEPARATOR } from "../../consts";
import { dateFromSlug, longDate } from "../../functions";

interface IBlogHeadingProps {
  children: ReactNode[];
  id?: string;
  slug: string;
}

export const BlogHeading = ({
  children,
  slug,
  ...props
}: IBlogHeadingProps) => {
  const date = dateFromSlug(slug);

  return (
    <>
      <h1 {...props}>{children}</h1>
      {date && (
        <p>
          <em>
            {longDate(date)}
            {SEPARATOR}
            {date.toISOWeekDate()}
          </em>
        </p>
      )}
    </>
  );
};
