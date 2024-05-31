import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsers } from "@/features/users/lib";

import { Filters } from "./filters";

export default async function Search({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const users = await getUsers(searchParams.username?.toString() ?? "");

  return (
    <main className="container max-w-screen-sm py-8">
      <Filters />

      <ul className="mt-8 space-y-4">
        {users.map(({ id, name, username, image }) => (
          <li key={id}>
            <div className="flex gap-4">
              <Link href={`/users/${username}`}>
                <Avatar>
                  <AvatarImage src={image!} alt="" />

                  <AvatarFallback>
                    {username?.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className="space-y-2 text-sm">
                <h3 className="font-semibold">{name}</h3>

                <Link
                  href={`/users/${username}`}
                  className="text-muted-foreground"
                >
                  @{username}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
