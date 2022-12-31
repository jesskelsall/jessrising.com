import { createContext, useContext } from "react";
import { IGalleryPhoto } from "../types";

export const GalleryPhotosContext = createContext<IGalleryPhoto[]>([]);

export const useGalleryPhotos = (): IGalleryPhoto[] =>
  useContext(GalleryPhotosContext);
