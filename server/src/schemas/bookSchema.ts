import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  author: z.string().trim().min(1, "Author is required").max(255),
  isbn: z.string().trim().max(20).optional(),
});
