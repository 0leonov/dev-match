import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { PostList } from "@/components/post-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { getPostsByAuthor } from "@/entities/post";
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

  const posts = await getPostsByAuthor(user.id);

  return (
    <main className="container grid gap-8 py-8 sm:grid-cols-[16rem,_1fr] lg:grid-cols-[16rem,_1fr,_16rem]">
      <aside className="top-[6.75rem] h-fit rounded-lg border bg-card shadow-sm sm:sticky">
        <div className="relative border-b p-8 text-center">
          <Avatar className="mx-auto size-48 outline outline-offset-4 outline-border">
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

      <PostList
        posts={posts}
        className="mx-auto w-full max-w-screen-sm sm:col-start-2"
      />
    </main>
  );
}
