import { count, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { connections, db, users } from "@/db";

export async function createConnection(
  userId: string,
  connectedUserId: string,
) {
  await db.insert(connections).values({ userId, connectedUserId });

  const [user] = await db
    .select({ username: users.username })
    .from(users)
    .where(eq(users.id, connectedUserId))
    .limit(1);

  revalidatePath(`/users/${user.username}`);
}

export async function getConnectionCount(userId: string) {
  const [result] = await db
    .select({ count: count() })
    .from(connections)
    .where(
      or(
        eq(connections.userId, userId),
        eq(connections.connectedUserId, userId),
      ),
    );

  return result.count;
}

export async function isConnected(userId: string, connectedUserId: string) {
  return !!(
    (
      await db
        .select()
        .from(connections)
        .where(
          or(
            eq(connections.userId, userId),
            eq(connections.connectedUserId, connectedUserId),
          ),
        )
    ).length ||
    (
      await db
        .select()
        .from(connections)
        .where(
          or(
            eq(connections.userId, connectedUserId),
            eq(connections.connectedUserId, userId),
          ),
        )
    ).length
  );
}
