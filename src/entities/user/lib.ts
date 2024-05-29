import { and, eq, ilike, isNotNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db, users } from "@/db";

import { type UpdateUserSchema, updateUserSchema } from "./update-user-schema";

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return user;
}

export async function getUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username.toLowerCase()))
    .limit(1);

  return user;
}

export async function updateUser(id: string, data: UpdateUserSchema) {
  const parsedData = updateUserSchema.safeParse(data);

  if (!parsedData.success) {
    throw Error("Wrong data format");
  }

  if (parsedData.data.username) {
    const user = await getUserByUsername(parsedData.data.username);

    if (user && user.id !== id) {
      throw Error("Username is already taken");
    }
  }

  await db.update(users).set(data).where(eq(users.id, id));

  revalidatePath(`/users/${parsedData.data.username}`);
}

export async function getUsers(username?: string) {
  return await db
    .select()
    .from(users)
    .where(
      and(isNotNull(users.username), ilike(users.username, `%${username}%`)),
    );
}
