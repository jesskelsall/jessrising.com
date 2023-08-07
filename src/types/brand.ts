import { z } from "zod";

export const GalleryPhotoSlug = z.string().brand<"GalleryPhoto">();
export type GalleryPhotoSlug = z.infer<typeof GalleryPhotoSlug>;

export const TripSlug = z.string().brand<"Trip">();
export type TripSlug = z.infer<typeof TripSlug>;
