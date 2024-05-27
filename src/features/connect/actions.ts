"use server";

import { auth } from "@/auth";
import { createConnection } from "@/entities/connection";
import {
  createConnectionRequest,
  deleteConnectionRequest,
  getConnectionRequests,
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

export async function accept(userId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await deleteConnectionRequest(userId, session.user.id);

  await createConnection(userId, session.user.id);

  return { success: true };
}

export async function decline(userId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await deleteConnectionRequest(userId, session.user.id);

  return { success: true };
}

export async function get() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await getConnectionRequests(session.user.id);
}
