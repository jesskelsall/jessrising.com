import { z } from "zod";
import { GalleryPhotoSlug, TripSlug } from "./brand";
import { ISODateString } from "./date";
import { Emoji } from "./emoji";

export const TripData = z.object({
  title: z.string(),
  description: z.string().nullable(),
  emoji: Emoji,
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
