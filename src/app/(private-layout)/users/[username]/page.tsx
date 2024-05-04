import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { getUserByUsername } from "@/entities/user";
import { routes } from "@/lib/routes";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  const user = await getUserByUsername(params.username);

  if (!user) {
    return notFound();
  }

  const isCurrentUser = session?.user.username === user.username;

  return (
    <main className="container flex py-8">
      <aside className="max-w-64 rounded-lg border bg-card">
        <div className="relative border-b p-8 text-center">
          <Avatar className="size-48 outline outline-offset-4 outline-border">
            <AvatarImage src={user.image ?? undefined} />

            <AvatarFallback>
              {user.username?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-8 text-2xl font-bold text-card-foreground">
            {user.name}
          </h2>

          <h1 className="text-lg text-muted-foreground">@{user.username}</h1>

          <p className="mt-2 text-sm text-muted-foreground">{user.bio}</p>

          <div className="absolute inset-x-0 -bottom-5">
            {isCurrentUser ? (
              <Link
                href={routes.editProfile}
                className={buttonVariants({ variant: "outline" })}
              >
                Edit profile
              </Link>
            ) : null}
          </div>
        </div>

        <div className="p-8">
          <div className="text-center">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Connections</p>
          </div>
        </div>
      </aside>
    </main>
  );
}
