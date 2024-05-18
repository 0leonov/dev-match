import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { PostList } from "@/components/post-list";
import { getConnectionRequest } from "@/entities/connection-request";
import { getPostsByAuthor } from "@/entities/post";
import { getUserByUsername } from "@/entities/user";

import { SideBar } from "./side-bar";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return notFound();
  }

  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const isCurrentUser = session.user.username === user.username;

  const connectionRequest = await getConnectionRequest(
    session.user.id,
    user.id,
  );

  const action = isCurrentUser
    ? "edit"
    : connectionRequest.length
      ? "withdraw"
      : "connect";

  const posts = await getPostsByAuthor(user.id);

  return (
    <main className="container grid gap-8 py-8 sm:grid-cols-[16rem,_1fr] lg:grid-cols-[16rem,_1fr,_16rem]">
      <SideBar
        className="top-[6.75rem] h-fit sm:sticky"
        id={user.id}
        action={action}
        username={user.username!}
        name={user.name!}
        image={user.image!}
        bio={user.bio!}
      />

      <PostList
        posts={posts}
        className="mx-auto w-full max-w-screen-sm sm:col-start-2"
      />
    </main>
  );
}
