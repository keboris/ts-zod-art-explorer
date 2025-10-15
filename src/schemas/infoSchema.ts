import z from "zod";

const InfoSchema = z.object({
  license_text: z.string(),
  license_links: z.array(z.string()),
  version: z.string(),
});

export { InfoSchema };
