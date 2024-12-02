import { PropsWithChildren } from "react";

export const BlogStrong = ({ children }: PropsWithChildren) => (
  <strong className="font-sans-bold font-bold">{children}</strong>
);

export const BlogEmphasis = ({ children }: PropsWithChildren) => (
  <em className="italic">{children}</em>
);
