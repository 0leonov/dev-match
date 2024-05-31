import { z } from "zod";

import { isAdult } from "./utils";

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(16)
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores",
    )
    .optional(),
  bio: z.string().max(128).optional(),
  birthdate: z
    .string()
    .date()
    .refine(
      (value) => isAdult(new Date(value)),
      "You must be at least 16 years old",
    )
    .optional(),
  gender: z.enum(["not_specified", "male", "female"]).optional(),
  name: z.string().max(32).optional(),
  skills: z.array(z.string()).optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
