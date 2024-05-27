"use server";

import { auth, unstable_update } from "@/auth";
import { CompleteRegistrationSchema, updateUser } from "@/entities/user";

export async function completeRegistration(data: CompleteRegistrationSchema) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await updateUser(session.user.id, { ...data });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }

  await unstable_update(session);

  return { success: true };
}
