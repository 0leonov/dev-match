"use server";

import { auth, unstable_update } from "@/auth";

import { getUserByUsername, updateUser } from "./lib";
import { type UpdateUserSchema } from "./update-user-schema";

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

export async function checkUsernameAvailability(username: string) {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  if (session.user.username === username) {
    return true;
  }

  const user = await getUserByUsername(username);

  return !user;
}
