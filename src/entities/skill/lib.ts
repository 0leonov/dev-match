import { db, skills } from "@/db";

export async function getAll() {
  return await db.select().from(skills);
}
