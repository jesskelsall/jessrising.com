import { z } from "zod";
import { GalleryPhotoSlug, TripSlug } from "./brand";
import { ISODateString } from "./date";
import { LocationTitle } from "./location";
import { MarkdownString } from "./markdown";
import { TagTitle } from "./tag";

export const GalleryPhotoData = z.object({
  title: z.string(),
  meta: z.object({
    gps: z
      .object({
        lat: z.number(),
        long: z.number(),
      })
      .optional(),
    location: LocationTitle,
    tags: z.array(TagTitle),
    trip: TripSlug.nullable(),
  }),
  exif: z.object({
    camera: z.object({
      name: z.string(),
      lens: z.string().optional(),
      settings: z
        .object({
          exposureBias: z.number().optional(),
          exposureTime: z.number().optional(),
          focalLength: z.number().optional(),
          fStop: z.number().optional(),
          ISO: z.number().optional(),
        })
        .optional(),
    }),
    date: ISODateString,
    dimensions: z.object({
      height: z.number(),
      width: z.number(),
    }),
  }),
  settings: z
    .object({
      downloadOriginal: z.boolean().optional(), // Show download button on gallery photo page
      showPhoto: z.boolean().optional(), // Override hidePhotos from tags
    })
    .optional(),
});
export type GalleryPhotoData = z.infer<typeof GalleryPhotoData>;

export const GalleryPhoto = GalleryPhotoData.extend({
  slug: GalleryPhotoSlug,
  markdown: MarkdownString.optional(),
});
export type GalleryPhoto = z.infer<typeof GalleryPhoto>;
