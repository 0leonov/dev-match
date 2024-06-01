import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { NewSkill, skills } from "./schema";

dotenv.config({ path: ".env.local" });

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  const data: NewSkill[] = [
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

  await db.insert(skills).values(data);
};

main()
  .then(() => console.log("Seed done!"))
  .catch(console.error);
