import { createContext, useContext } from "react";
import { IBlogPost } from "../types";

export const BlogPostsContext = createContext<IBlogPost[]>([]);

export const useBlogPosts = (): IBlogPost[] => useContext(BlogPostsContext);
