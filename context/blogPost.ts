import { createContext, useContext } from "react";
import { IMarkdownData } from "../types";

export const BlogPostContext = createContext<IMarkdownData>({
  first: {},
  markdown: "",
  meta: {},
  slug: "",
});

export const useBlogPost = (): IMarkdownData => useContext(BlogPostContext);
