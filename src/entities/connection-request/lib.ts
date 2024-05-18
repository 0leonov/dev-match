import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { revalidatePath } from "next/cache";

import { connectionRequests, db, users } from "@/db";

export async function createConnectionRequest(
  userId: string,
  targetId: string,
) {
  const [user] = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.id, targetId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  await db.insert(connectionRequests).values({ userId, targetId });

  revalidatePath(`/users/${user.username}`);
}

export async function deleteConnectionRequest(
  userId: string,
  targetId: string,
) {
  const [user] = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.id, targetId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  await db
    .delete(connectionRequests)
    .where(
      and(
        eq(connectionRequests.userId, userId),
        eq(connectionRequests.targetId, targetId),
      ),
    );

  revalidatePath(`/users/${user.username}`);
}

export async function getConnectionRequest(userId: string, targetId: string) {
  const targetUser = alias(users, "targetUser");

  return db
    .select({
      targetId: targetUser.id,
      targetName: targetUser.name,
      targetUsername: targetUser.username,
      targetImage: targetUser.image,
      userId: users.id,
      userName: users.name,
      userUsername: users.username,
      userAvatar: users.image,
    })
    .from(connectionRequests)
    .where(
      and(
        eq(connectionRequests.userId, userId),
        eq(connectionRequests.targetId, targetId),
      ),
    )
    .leftJoin(users, eq(users.id, connectionRequests.userId))
    .leftJoin(targetUser, eq(targetUser.id, connectionRequests.targetId));
}
