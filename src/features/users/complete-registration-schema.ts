import { z } from "zod";

export const completeRegistrationSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(16)
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores",
    ),
});

export type CompleteRegistrationSchema = z.infer<
  typeof completeRegistrationSchema
>;
