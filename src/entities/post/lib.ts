import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db, posts, users } from "@/db";
import { getUserById } from "@/entities/user";
import { routes } from "@/lib/routes";

import { type CreatePostSchema, createPostSchema } from "./create-post-schema";

export async function getPosts() {
  return await db
    .select({
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

export async function getPostsByAuthor(authorId: string) {
  return await db
    .select({
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

  revalidatePath(`/users/${author.username}`);

  revalidatePath(routes.home);
}
