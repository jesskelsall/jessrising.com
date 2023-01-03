import { DateTime } from "luxon";
import { useBlogPost } from "../../context";
import { formatFullDate } from "../../functions";

interface IBlogHeadingProps {
  children: React.ReactNode[];
  id?: string;
}

export const BlogHeading = ({ children, ...props }: IBlogHeadingProps) => {
  const { date } = useBlogPost();

  return (
    <>
      <h1 {...props}>{children}</h1>
      {date && (
        <p>
          <em>{formatFullDate(DateTime.fromISO(date))}</em>
        </p>
      )}
    </>
  );
};
