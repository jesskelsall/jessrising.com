import { createContext, useContext } from "react";
import { IMarkdownData } from "../types";

export const GalleryPhotoContext = createContext<IMarkdownData>({
  first: {},
  markdown: "",
  meta: {},
  slug: "",
});

export const useGalleryPhoto = (): IMarkdownData =>
  useContext(GalleryPhotoContext);
