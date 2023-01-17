import { createContext, useContext } from "react";
import { IMarkdownData } from "../types";

export const GalleryPhotoContext = createContext<IMarkdownData>({
  markdown: "",
  meta: {},
  slug: "",
  summary: {},
});

export const useGalleryPhoto = (): IMarkdownData =>
  useContext(GalleryPhotoContext);
