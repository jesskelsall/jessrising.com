import { GalleryPhoto, GalleryPhotoSlug } from "../types/galleryPhoto";
import galleryPhotosJSON from "./galleryPhotos.json";

export const allGalleryPhotosList: GalleryPhoto[] = galleryPhotosJSON.map(
  (galleryPhoto) => GalleryPhoto.parse(galleryPhoto)
);

export const allGalleryPhotosDict = allGalleryPhotosList.reduce<
  Record<GalleryPhotoSlug, GalleryPhoto>
>((acc, next) => ({ ...acc, [next.slug]: next }), {});

export const allGalleryPhotoSlugs: GalleryPhotoSlug[] =
  allGalleryPhotosList.map((galleryPhoto) => galleryPhoto.slug);
