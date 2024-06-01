"use server";

import { auth } from "@/auth";

import * as lib from "./lib";

export async function request(targetId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lib.createConnectionRequest(session.user.id, targetId);

  return { success: true };
}

export async function withdraw(targetId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lib.deleteConnectionRequest(session.user.id, targetId);

  return { success: true };
}

export async function accept(userId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lib.deleteConnectionRequest(userId, session.user.id);

  await lib.createConnection(userId, session.user.id);

  return { success: true };
}

export async function decline(userId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await lib.deleteConnectionRequest(userId, session.user.id);

  return { success: true };
}

export async function getRequests() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await lib.getConnectionRequests(session.user.id);
}
