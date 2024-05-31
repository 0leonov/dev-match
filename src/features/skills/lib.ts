import { db, skills } from "@/db";

export async function getSkills() {
  return await db.select().from(skills);
}
