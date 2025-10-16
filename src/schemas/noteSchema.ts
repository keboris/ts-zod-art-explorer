import { z } from "zod";

const NoteSchema = z.object({
  text: z.string().max(200, "The note must not exceed 200 characters"),
});

export { NoteSchema };
