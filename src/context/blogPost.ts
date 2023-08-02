import { createContext, useContext } from "react";
import { MARKDOWN_DATA_EMPTY } from "../consts/data";
import { IMarkdownData } from "../types/markdownOld";

export const BlogPostContext =
  createContext<IMarkdownData>(MARKDOWN_DATA_EMPTY);

export const useBlogPost = (): IMarkdownData => useContext(BlogPostContext);
