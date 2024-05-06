import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1).max(255),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
