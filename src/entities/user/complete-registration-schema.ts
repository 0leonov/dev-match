import { z } from "zod";

import { isAdult } from "./utils";

export const completeRegistrationSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(16)
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores",
    ),
  bio: z.string().max(128),
  birthdate: z
    .string()
    .date()
    .refine(
      (value) => isAdult(new Date(value)),
      "You must be at least 16 years old",
    ),
  gender: z.enum(["not_specified", "male", "female"]),
});

export type CompleteRegistrationSchema = z.infer<
  typeof completeRegistrationSchema
>;
