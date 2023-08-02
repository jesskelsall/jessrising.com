import { createContext, useContext } from "react";
import { GALLERY_PHOTO_EMPTY } from "../consts/data";
import { GalleryPhoto } from "../types/galleryPhoto";

export const GalleryPhotoContext =
  createContext<GalleryPhoto>(GALLERY_PHOTO_EMPTY);

export const useGalleryPhoto = (): GalleryPhoto =>
  useContext(GalleryPhotoContext);
