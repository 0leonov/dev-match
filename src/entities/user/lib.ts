import { eq } from "drizzle-orm";

import { db, users } from "@/db";

import { UpdateUserSchema, updateUserSchema } from "./update-user-schema";

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

  return await db.update(users).set(data).where(eq(users.id, id)).returning();
}
