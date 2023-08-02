import { createContext, useContext } from "react";
import { IMarkdownData } from "../types/markdownOld";

export const BlogPostsContext = createContext<IMarkdownData[]>([]);

export const useBlogPosts = (): IMarkdownData[] => useContext(BlogPostsContext);
