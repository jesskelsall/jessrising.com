import { createContext, useContext } from "react";
import { GalleryPhoto } from "../types/galleryPhoto";
import { GALLERY_PHOTO_EMPTY } from "../consts/data";

export const GalleryPhotoContext =
  createContext<GalleryPhoto>(GALLERY_PHOTO_EMPTY);

export const useGalleryPhoto = (): GalleryPhoto =>
  useContext(GalleryPhotoContext);
