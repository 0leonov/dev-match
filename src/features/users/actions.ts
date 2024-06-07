"use server";

import { auth, signOut, unstable_update } from "@/auth";

import * as lib from "./lib";
import { type UpdateUserSchema } from "./update-user-schema";

export async function editProfile(data: UpdateUserSchema) {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  try {
    await lib.updateUser(session.user.id, data);
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

  const user = await lib.getUserByUsername(username);

  return !user;
}

export async function searchUsers({
  username,
  skillId,
}: {
  username?: string;
  skillId?: string;
}) {
  return await lib.getUsers({ username, skillId });
}

export async function deleteUser() {
  const session = await auth();

  if (!session) {
    throw Error("Not authenticated");
  }

  await lib.deleteUser(session.user.id);

  await signOut({ redirectTo: "/" });
}
