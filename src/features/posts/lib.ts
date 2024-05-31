import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db, posts, users } from "@/db";
import { getUserById } from "@/features/users/lib";

import { type CreatePostSchema, createPostSchema } from "./create-post-schema";
import type { Post } from "./types";

export async function getPosts(): Promise<Post[]> {
  return await db
    .select({
      id: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      authorName: users.name,
      authorUsername: users.username,
      authorImage: users.image,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  return await db
    .select({
      id: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      authorName: users.name,
      authorUsername: users.username,
      authorImage: users.image,
    })
    .from(posts)
    .where(eq(posts.authorId, authorId))
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));
}

export async function createPost(data: CreatePostSchema, authorId: string) {
  const parsedData = createPostSchema.safeParse(data);

  if (!parsedData.success) {
    throw Error("Wrong data format");
  }

  await db.insert(posts).values({ authorId, ...parsedData.data });

  const author = await getUserById(authorId);

  if (!author?.username) {
    throw Error("Author not found");
  }

  revalidatePath(`/users/${author.username}`);

  revalidatePath("/home");
}

export async function deletePost(id: string) {
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

  if (!post) {
    throw Error("Post not found");
  }

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath(`/users/${post.authorId}`);

  revalidatePath("/home");
}
