import { getSkills } from "@/features/skills/lib";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function EditSkills() {
  const data = await getSkills();

  return (
    <main className="container py-8">
      <DataTable columns={columns} data={data} />
    </main>
  );
}
