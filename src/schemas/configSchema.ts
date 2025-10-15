import z from "zod";

const ConfigSchema = z.object({
  iiif_url: z.string(),
  website_url: z.string(),
});

export { ConfigSchema };
