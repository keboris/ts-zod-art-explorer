import z from "zod";
import { ConfigSchema } from "./configSchema";
import { ArtworkSchema } from "./artworkSchema";
import { InfoSchema } from "./infoSchema";
import { PaginationSchema } from "./paginationSchema";

const ArtworkResponseSchema = z.object({
  config: ConfigSchema,
  data: z.array(ArtworkSchema),
  info: InfoSchema,
  pagination: PaginationSchema,
});

export { ArtworkResponseSchema };
