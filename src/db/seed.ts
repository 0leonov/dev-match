import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { InsertSkill, skills, users, userSkills } from "./schema";

dotenv.config({ path: "./.env.local" });

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

async function main() {
  const data: InsertSkill[] = [
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "Python" },
    { name: "Go" },
    { name: "Rust" },
    { name: "Java" },
    { name: "Ruby" },
    { name: "C#" },
    { name: "C++" },
    { name: "C" },
    { name: "PHP" },
    { name: "Swift" },
    { name: "Kotlin" },
    { name: "Objective-C" },
    { name: "Scala" },
    { name: "Perl" },
    { name: "Haskell" },
    { name: "Lua" },
    { name: "Shell" },
    { name: "SQL" },
  ];
  await db.insert(skills).values(data);

  const [{ userId }] = await db
    .select({ userId: users.id })
    .from(users)
    .where(eq(users.username, "leonov"));

  const s = await db.select({ skillId: skills.id }).from(skills);

  await db
    .insert(userSkills)
    .values(s.map(({ skillId }) => ({ userId, skillId })));
}

main()
  .then(() => console.log("Seeding done!"))
  .catch(console.error);
