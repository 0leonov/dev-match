"use server";

import { auth } from "@/auth";
import { createPost as create, type CreatePostSchema } from "@/entities/post";

export async function createPost(data: CreatePostSchema) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await create(data, session.user.id);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }

  return { success: true };
}
