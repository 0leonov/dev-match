"use server";

import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db, posts, users } from "@/db";

import type { CreatePostSchema } from "./create-post-schema";
import * as lib from "./lib";

export async function createPost(data: CreatePostSchema) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await lib.createPost(data, session.user.id);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }

  return { success: true };
}

export async function deletePost(id: string) {
  const session = await auth();

  if (!session) {
    throw Error("Unauthorized");
  }

  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

  if (!post) {
    throw Error("Post not found");
  }

  const [user] = await db
    .select({ id: users.id, roles: users.roles })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) {
    throw Error("User not found");
  }

  if (post.authorId !== user.id && !user.roles?.includes("admin")) {
    throw Error("Forbidden");
  }

  await lib.deletePost(id);
}
