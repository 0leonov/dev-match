import { getSkills } from "@/features/skills/lib";

import { Filters } from "./filters";
import { UserList } from "./user-list";

export default async function Search() {
  const skills = await getSkills();

  return (
    <main className="container max-w-screen-sm py-8">
      <Filters skills={skills} />

      <UserList />
    </main>
  );
}
