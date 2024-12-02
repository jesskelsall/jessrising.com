import { PropsWithChildren } from "react";

export const BlogUnorderedList = ({ children }: PropsWithChildren) => (
  <ul className="my-4 ml-8 list-disc">{children}</ul>
);

export const BlogListItem = ({ children }: PropsWithChildren) => (
  <li className="marker:pr-4 marker:text-rising-700 marker:dark:text-rising-600">
    {children}
  </li>
);
