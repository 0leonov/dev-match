import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { PostList } from "@/features/posts/post-list";
import { getConnectionCount, isConnected } from "@/features/connection";
import { getConnectionRequest } from "@/features/connection-request";
import { getPostsByAuthor } from "@/entities/post";
import { getUserByUsername, getUserSkills } from "@/features/user";

import { Action, SideBar } from "./side-bar";

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

  let action: Action;

  if (session.user.username === user.username) {
    action = "edit";
  } else if (await getConnectionRequest(session.user.id, user.id)) {
    action = "withdraw";
  } else if (await getConnectionRequest(user.id, session.user.id)) {
    action = "accept";
  } else if (await isConnected(user.id, session.user.id)) {
    action = "message";
  } else {
    action = "connect";
  }

  const posts = await getPostsByAuthor(user.id);

  const connectionCount = await getConnectionCount(user.id);

  const skills = await getUserSkills(user.id);

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
        connectionCount={connectionCount}
        skills={skills}
      />

      <PostList
        posts={posts}
        className="mx-auto w-full max-w-screen-sm sm:col-start-2"
      />
    </main>
  );
}
