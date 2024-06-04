import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  NewSkill,
  NewUser,
  NewUserSkill,
  skills,
  users,
  userSkills,
} from "./schema";

dotenv.config({ path: ".env.local" });

const generateUsers = (count: number): NewUser[] => {
  return new Array(count).fill(null).map((_, i) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    username: `user${i}`,
    image: faker.image.avatar(),
  }));
};

function generateUserSkills(
  userId: string,
  skills: { id: string }[],
  count?: number | { min: number; max: number },
): NewUserSkill[] {
  return faker.helpers
    .arrayElements(skills, count)
    .map((skill) => ({ skillId: skill.id, userId }));
}

function generateSkills(): NewSkill[] {
  return [
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "GraphQL" },
    { name: "Next.js" },
    { name: "Tailwind CSS" },
    { name: "Cypress" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Socket.IO" },
    { name: "Redis" },
    { name: "C#" },
    { name: "Python" },
    { name: "Java" },
    { name: "C++" },
    { name: "Ruby" },
    { name: "PHP" },
    { name: "Swift" },
    { name: "Kotlin" },
    { name: "Go" },
    { name: "Rust" },
    { name: "Scala" },
    { name: "Haskell" },
    { name: ".NET" },
    { name: "Ruby on Rails" },
    { name: "Laravel" },
    { name: "Spring" },
    { name: "Django" },
    { name: "Flutter" },
    { name: "React Native" },
    { name: "Xamarin" },
    { name: "Unity" },
    { name: "Unreal Engine" },
  ];
}

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  const newSkills = await db
    .insert(skills)
    .values(generateSkills())
    .returning({ id: skills.id });

  const newUsers = await db
    .insert(users)
    .values(generateUsers(30))
    .returning({ id: users.id });

  for (const user of newUsers) {
    const newUserSkills = generateUserSkills(user.id, newSkills, {
      min: 1,
      max: 10,
    });

    await db.insert(userSkills).values(newUserSkills);
  }
};

main()
  .then(() => console.log("Seed done!"))
  .catch(console.error);
