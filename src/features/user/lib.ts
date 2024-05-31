import { and, eq, ilike, isNotNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db, type Skill, skills, users, userSkills } from "@/db";

import type { User } from "./types";
import { type UpdateUserSchema, updateUserSchema } from "./update-user-schema";

export async function getUserById(id: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.id, id));

  return result[0] || null;
}

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username.toLowerCase()));

  return result[0] || null;
}

export async function updateUser(id: string, data: UpdateUserSchema) {
  const parsedData = updateUserSchema.safeParse(data);

  if (!parsedData.success) {
    throw Error("Wrong data format");
  }

  const { skills, username, bio, birthdate, gender } = parsedData.data;

  if (username) {
    const user = await getUserByUsername(username);

    if (user && user.id !== id) {
      throw Error("Username is already taken");
    }
  }

  if (skills) {
    await db.delete(userSkills).where(eq(userSkills.userId, id));

    await db
      .insert(userSkills)
      .values(skills.map((skillId) => ({ userId: id, skillId })));
  }

  if (username ?? bio ?? birthdate ?? gender) {
    await db.update(users).set(parsedData.data).where(eq(users.id, id));
  }

  revalidatePath(`/users/${parsedData.data.username}`);
}

export async function getUsers(username?: string): Promise<User[]> {
  return await db
    .select()
    .from(users)
    .where(
      and(isNotNull(users.username), ilike(users.username, `%${username}%`)),
    );
}

export async function getUserSkills(id: string): Promise<Skill[]> {
  const result = await db
    .select({ id: userSkills.skillId, name: skills.name })
    .from(users)
    .where(eq(users.id, id))
    .leftJoin(userSkills, eq(users.id, userSkills.userId))
    .leftJoin(skills, eq(userSkills.skillId, skills.id));

  return result.map(({ name, id }) => ({ id: id ?? "", name }));
}
