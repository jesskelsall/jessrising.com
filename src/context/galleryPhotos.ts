import { createContext, useContext } from "react";
import { GalleryPhotos } from "../types/galleryPhoto";

export const GalleryPhotosContext = createContext<GalleryPhotos>({});

export const useGalleryPhotos = (): GalleryPhotos =>
  useContext(GalleryPhotosContext);
