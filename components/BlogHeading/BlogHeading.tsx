import { SEPARATOR } from "../../consts";
import { dateFromSlug, formatFullDate, longDate } from "../../functions";

interface IBlogHeadingProps {
  children: React.ReactNode[];
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
          <em>{formatFullDate(date)}</em>
        </p>
      )}
    </>
  );
};
