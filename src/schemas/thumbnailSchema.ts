import z from "zod";

const ThumbnailSchema = z.object({
  lqip: z.string(),
  width: z.number(),
  height: z.number(),
  alt_text: z.string(),
});

export { ThumbnailSchema };
