import z from "zod";

const PaginationSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  next_url: z.string().optional().nullable(),
});

export { PaginationSchema };
