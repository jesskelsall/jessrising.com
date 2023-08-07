import { z } from "zod";
import { ISODateString } from "./date";
import { Location } from "./location";
import { MarkdownString } from "./markdown";
import { TagId } from "./tag";

export const GalleryPhotoSlug = z.string().brand<"GalleryPhoto">();
export type GalleryPhotoSlug = z.infer<typeof GalleryPhotoSlug>;

export const GalleryPhotoData = z.object({
  title: z.string(),
  meta: z.object({
    gps: z
      .object({
        lat: z.number(),
        long: z.number(),
      })
      .optional(),
    location: Location,
    tags: z.array(TagId),
    trip: z.string().nullable(),
  }),
  exif: z.object({
    camera: z
      .object({
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
      })
      .optional(),
    date: ISODateString.optional(),
    dimensions: z
      .object({
        height: z.number(),
        width: z.number(),
      })
      .optional(),
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
