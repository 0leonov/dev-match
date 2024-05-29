"use server";

import { auth } from "@/auth";
import { deletePost as del } from "@/entities/post";

export async function deletePost(id: string) {
  const session = await auth();

  if (!session) {
    throw Error("Unauthorized");
  }

  await del(id, session?.user.id);
}
