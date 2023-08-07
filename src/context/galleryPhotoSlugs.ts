import { createContext, useContext } from "react";
import { GalleryPhotoSlug } from "../types/brand";

export const GalleryPhotoSlugsContext = createContext<GalleryPhotoSlug[]>([]);

export const useGalleryPhotoSlugs = (): GalleryPhotoSlug[] =>
  useContext(GalleryPhotoSlugsContext);
