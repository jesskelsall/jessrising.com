import { createContext, useContext } from "react";
import { MARKDOWN_DATA_EMPTY } from "../consts/data";
import { IMarkdownData } from "../types/markdown";

export const GalleryPhotoContext =
  createContext<IMarkdownData>(MARKDOWN_DATA_EMPTY);

export const useGalleryPhoto = (): IMarkdownData =>
  useContext(GalleryPhotoContext);
