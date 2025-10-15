import z from "zod";
import { ThumbnailSchema } from "./thumbnailSchema";

const ArtworkSchema = z.object({
  id: z.number().positive(),
  api_link: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  artist_title: z.string().min(5).optional().nullable(),
  image_id: z.string().optional().nullable(),
  thumbnail: ThumbnailSchema.optional().nullable(),
});

export { ArtworkSchema };
