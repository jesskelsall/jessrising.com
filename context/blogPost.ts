import { createContext, useContext } from "react";
import { IMarkdownData } from "../types";

export const BlogPostContext = createContext<IMarkdownData>({
  markdown: "",
  meta: {},
  slug: "",
  summary: {},
});

export const useBlogPost = (): IMarkdownData => useContext(BlogPostContext);