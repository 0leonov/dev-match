import Link from "next/link";

import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export default async function Profile() {
  const session = await auth();

  return (
    <main className="container flex py-8">
      <aside className="max-w-64 rounded-lg border bg-card">
        <div className="relative border-b p-8 text-center">
          <Avatar className="size-48 outline outline-offset-4 outline-border">
            <AvatarImage src={session?.user.image ?? undefined} />

            <AvatarFallback>
              {session?.user.username?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-8 text-2xl font-bold text-card-foreground">
            {session?.user.name}
          </h2>

          <h1 className="text-lg text-muted-foreground">
            @{session?.user.username}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {session?.user.bio}
          </p>

          <div className="absolute inset-x-0 -bottom-5">
            <Link
              href={routes.editProfile}
              className={buttonVariants({ variant: "outline" })}
            >
              Edit profile
            </Link>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center">
            <p className="text-2xl font-bold">20K</p>
            <p className="text-sm text-muted-foreground">Connections</p>
          </div>
        </div>
      </aside>
    </main>
  );
}
