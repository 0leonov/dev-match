"use server";

import { auth, unstable_update } from "@/auth";
import { updateUser, UpdateUserSchema } from "@/entities/user";

export async function editProfile(data: UpdateUserSchema) {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  try {
    await updateUser(session.user.id, data);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }

  await unstable_update(session);

  return { success: true };
}