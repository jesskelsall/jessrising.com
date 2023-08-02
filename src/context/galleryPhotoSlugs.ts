import { createContext, useContext } from "react";

export const GalleryPhotoSlugsContext = createContext<string[]>([]);

export const useGalleryPhotoSlugs = (): string[] =>
  useContext(GalleryPhotoSlugsContext);
