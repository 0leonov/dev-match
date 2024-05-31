import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { revalidatePath } from "next/cache";

import { connectionRequests, db, users } from "@/db";

export async function createConnectionRequest(
  userId: string,
  targetId: string,
) {
  const existingRequest =
    (await getConnectionRequest(userId, targetId)) ||
    (await getConnectionRequest(targetId, userId));

  if (existingRequest) {
    throw new Error("Connection request already exists");
  }

  await db.insert(connectionRequests).values({ userId, targetId });

  const [user] = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.id, targetId))
    .limit(1);

  revalidatePath(`/users/${user.username}`);
  revalidatePath(`/notifications`);
}

export async function deleteConnectionRequest(
  userId: string,
  targetId: string,
) {
  await db
    .delete(connectionRequests)
    .where(
      and(
        eq(connectionRequests.userId, userId),
        eq(connectionRequests.targetId, targetId),
      ),
    );

  const [user] = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.id, targetId))
    .limit(1);

  revalidatePath(`/users/${user.username}`);
  revalidatePath(`/notifications`);
}

export async function getConnectionRequest(userId: string, targetId: string) {
  const targetUser = alias(users, "targetUser");

  const [result] = await db
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
    .leftJoin(targetUser, eq(targetUser.id, connectionRequests.targetId))
    .limit(1);

  return result;
}

export async function getConnectionRequests(targetId: string) {
  return db
    .select({
      userId: users.id,
      userName: users.name,
      userUsername: users.username,
      userAvatar: users.image,
    })
    .from(connectionRequests)
    .where(eq(connectionRequests.targetId, targetId))
    .leftJoin(users, eq(users.id, connectionRequests.userId));
}
