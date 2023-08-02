import { z } from "zod";
import { Location } from "./location";
import { MarkdownString } from "./markdown";
import { Tag } from "./tag";

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
    tags: z.array(Tag),
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
    date: z.string().datetime({ offset: true }).optional(),
    dimensions: z
      .object({
        height: z.number(),
        width: z.number(),
      })
      .optional(),
  }),
});
export type GalleryPhotoData = z.infer<typeof GalleryPhotoData>;

export const GalleryPhoto = GalleryPhotoData.extend({
  slug: GalleryPhotoSlug,
  markdown: MarkdownString.optional(),
});
export type GalleryPhoto = z.infer<typeof GalleryPhoto>;
