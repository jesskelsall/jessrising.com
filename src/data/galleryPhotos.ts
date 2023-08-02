import { GalleryPhoto, GalleryPhotoSlug } from "../types/galleryPhoto";
import galleryPhotosJSON from "./galleryPhotos.json";

export const galleryPhotosList: GalleryPhoto[] = galleryPhotosJSON.map(
  (galleryPhoto) => GalleryPhoto.parse(galleryPhoto)
);

export const galleryPhotosDict = galleryPhotosList.reduce<
  Record<GalleryPhotoSlug, GalleryPhoto>
>((acc, next) => ({ ...acc, [next.slug]: next }), {});

export const galleryPhotoSlugs: GalleryPhotoSlug[] = galleryPhotosList.map(
  (galleryPhoto) => galleryPhoto.slug
);
