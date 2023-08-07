import { z } from "zod";
import { ISODateString } from "./date";
import { GalleryPhotoSlug } from "./galleryPhoto";

export const TripSlug = z.string().brand<"Trip">();
export type TripSlug = z.infer<typeof TripSlug>;

export const TripData = z.object({
  title: z.string(),
  description: z.string().nullable(),
  thumbnail: GalleryPhotoSlug,
  dates: z.object({
    from: ISODateString,
    to: ISODateString.optional(),
  }),
});
export type TripData = z.infer<typeof TripData>;

export const Trip = TripData.extend({
  slug: TripSlug,
});
export type Trip = z.infer<typeof Trip>;
