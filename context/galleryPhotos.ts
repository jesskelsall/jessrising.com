import { createContext, useContext } from "react";
import { IMarkdownData } from "../types";

export const GalleryPhotosContext = createContext<IMarkdownData[]>([]);

export const useGalleryPhotos = (): IMarkdownData[] =>
  useContext(GalleryPhotosContext);
