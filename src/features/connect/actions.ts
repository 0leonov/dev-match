"use server";

import { auth } from "@/auth";
import {
  createConnectionRequest,
  deleteConnectionRequest,
} from "@/entities/connection-request";

export async function request(targetId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await createConnectionRequest(session.user.id, targetId);

  return { success: true };
}

export async function withdraw(targetId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await deleteConnectionRequest(session.user.id, targetId);

  return { success: true };
}
